import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import http from "http";
import { fileURLToPath } from 'url';
// import { Server } from 'socket.io';

import HttpException from './utils/HttpException.utils.js';
import errorMiddleware from './middlewares/error.middleware.js';
import AuthRouter from './routes/auth.route.js';

const app = express();

app.use(cors());
app.options("*", cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// const server = http.createServer(app);
// const io = new Server(server,{
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });
// export { io };

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const publicFolderPath = process.env.PUBLIC_FOLDER_PATH || path.join(__dirname, '../public');

app.use("/public", express.static(publicFolderPath));

const PORT = process.env.PORT || process.env.APP_PORT

// io.on('connection', (socket) => {
//     // console.log('a user connected', socket.id);
// });

app.use(`/api/auth`, AuthRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`));
// server.timeout = 120000;

var server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`));
server.timeout = 120000;

export default app;