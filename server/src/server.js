import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import HttpException from './utils/HttpException.utils.js';
import errorMiddleware from './middlewares/error.middleware.js';
import AuthRouter from './routes/auth.route.js';

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static('public'));
app.use(express.static(path.resolve()));

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const PORT = process.env.PORT || process.env.APP_PORT

app.use(`/api/auth`, AuthRouter);


// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// Starting the server
var server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}!`));
server.timeout = 120000;

export default app;