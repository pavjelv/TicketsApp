const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const ticketController = require ('../../controllers/ticket.ctrl')
const userController = require ('../../controllers/user.ctrl')
const multipart = require ('connect-multiparty')
const multipartWare = multipart()

const Users = require('../../models/Users')
const User = require('../../models/User')


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
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

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
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
  passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      User.find({"email": user.email}).then((userDetails => {
            if(userDetails) {
                let credentials = {
                    firstName : userDetails[0].firstName,
                    token : "Token " + user.token,
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
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      console.log("user");
      User.find({"email" : user.email})
      .then((usr)=> {
          res.send(usr)
      })
      //return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
