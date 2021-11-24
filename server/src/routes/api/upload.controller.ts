import express, {Response} from "express";
const multer  = require("multer");
const upload = multer({ dest: "uploads" });

const router = express.Router();

router.post("/img", upload.single('file'), function (req: any, res: Response) {
    let fileData = req.file;
    console.log(fileData);
    if(!fileData)
        res.send("Error while loading file!");
    else
        res.send("File has been loaded!");
});

module.exports = router;
