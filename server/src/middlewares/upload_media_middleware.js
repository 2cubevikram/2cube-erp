import multer from "multer";
import path from "path";
import util from 'util';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(path.resolve() + '/public/uploads/');
        cb(null, path.resolve() + `/public/uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

let uploadFileMiddleware = multer({
    storage: storage
}).any("any");

let uploadMediaFile = util.promisify(uploadFileMiddleware);

export default uploadMediaFile;