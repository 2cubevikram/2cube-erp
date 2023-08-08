import notificationModel from "../models/notification.model.js";


/******************************************************************************
 *                              Notification Controller
 ******************************************************************************/
class NotificationController {

    leaveNotification = async (req, res, next) => {
        console.log(req.body)
        await notificationModel.createNotification(req.body);
    }

    getAllNotification = async (req, res, next) => {
        const result = await notificationModel.findAllNotification({'status': null}, {'id': 'ASC'});
        res.status(200).send(result);
    }



}



/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new NotificationController;