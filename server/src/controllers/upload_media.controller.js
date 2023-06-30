import uploadMediaFile from "../middlewares/upload_media_middleware.js";
import multer from "multer";


/******************************************************************************
 *                              Upload Media Controller
 ******************************************************************************/

class UploadMediaController {

    uplodMedia = async (req, res, next) => {
        try {
            await uploadMediaFile(req, res)
        } catch (err) {
            console.log(err);
            if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        }
        next();
    };

}

/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new UploadMediaController;