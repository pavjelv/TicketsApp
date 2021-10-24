import passport from "passport";
import express, {NextFunction, Request, Response} from "express";
import {auth} from "../auth";
import {SecureUser} from "../../models/SecureUser";
import {DetailedUser} from "../../models/DetailedUser";
import {DetailedUserModel, SecureUserModel} from "@pavo/shared-services-shared/src";
import {SecureUserDao} from "../../models/dao/secure-user.dao";

const router = express.Router();


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req: Request, res: Response) => {
    let user = ({
        email: req.body.email,
        password: req.body.password
    })
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new SecureUser(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req: Request, res: Response, next: NextFunction): any => {
    let user = ({
        email: req.body.email,
        password: req.body.password
    })

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  passport.authenticate('local', { session: false }, (err: unknown, passportUser: SecureUserDao, info) => {
    if(err) {
      return next(err);
    }
    if (passportUser) {
      const user: SecureUserDao = passportUser;
      user.token = passportUser.generateJWT();
      DetailedUser.find({"email": user.email}).then(((userDetails: DetailedUserModel[]) => {
            if(userDetails) {
                let credentials = {
                    firstName : userDetails[0].firstName,
                    token : "Token=" + user.token,
                    role: userDetails[0].role,
                    id : userDetails[0]._id
                }
                console.log(credentials)
                //user.email = userDetails.firstName;
                return res.json({credentials});
            }
            return res.status(401).send(info);
      }))  
    }
    else return res.status(401).send(info);
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req: Request, res: Response) => {
  // @ts-ignore
    const { payload: { id } } = req;
  return SecureUser.findById(id)
    .then((user: SecureUserModel) => {
      if (!user) {
        return res.sendStatus(400);
      }
      console.log("user");
      return SecureUser.find({"email" : user.email})
      .then((usr: SecureUserModel)=> {
          res.send(usr)
      })
      //return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
