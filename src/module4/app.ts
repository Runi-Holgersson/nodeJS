import express from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import {usersRouter} from './routers/user.controllers';
import {groupsRouter} from "./routers/group.controllers";
import {logger} from "./utils/logger";
import winston, {exceptions, format, rejections, transports} from "winston";
import cors from "cors";
import {checkToken} from "./services/check-token.service";
import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200,
}

const server = express();
const port = process.env.PORT || 8000;
server.use(helmet());
server.use(bodyParser.json());
server.use(checkToken)
server.use(usersRouter);
server.use(groupsRouter);
server.use(cors(corsOptions));

server.get('/', (req, res) => {
    logger.http({
        level: 'http',
        message: `called method ${req.method} url ${req.url}`,
    })
    res.setHeader('Content-Type', 'application/json');
    res.send('Home page');
});

server.on('uncaughtException', () => {
    logger.exceptions.handle(new winston.transports.File({ filename: './src/module4/logs/exceptions.log' }));
});

server.listen(port, () => {
        logger.log({
            level: 'info',
            message: `Express is listening at http://localhost:${port}`,
        });
        logger.exceptions.handle(
            new transports.File({ filename: './src/module4/logs/exceptions.log', level: 'error', format: format.json() })
        );
        logger.rejections.handle(
            new transports.File({ filename: './src/module4/logs/rejections.log', level: 'error' })
        )
});


