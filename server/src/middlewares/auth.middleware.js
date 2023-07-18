import HttpException from '../utils/HttpException.utils.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthModel from '../models/auth.model.js';
dotenv.config();

const auth = () => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                res.status(401).send({ message: 'Access denied. No credentials sent!' });
                return;
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await AuthModel.findOne({ id: decoded.user_id });

            if (!user) {
                res.status(401).send({ message: 'Authentication failed!' });
                return;
            }
            if (user.status != 'Active' && user.status != 'Unverified') {
                res.status(401).send({ message: 'Editing is limited to the respective account holders only' });
                return;
            }

            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default auth;