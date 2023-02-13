import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from "body-parser";
import {usersRouter} from './routers/user.controllers';
import {groupsRouter} from "./routers/group.controllers";
import {logger} from "./utils/logger";

const server = express();
const port = process.env.PORT || 8000;
server.use(helmet());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(usersRouter);
server.use(groupsRouter);

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Home page');
});

server.listen(port, () => {
    logger.log({
        level: 'info',
        message: `Express is listening at http://localhost:${port}`,
    })
});

