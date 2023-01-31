import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from "body-parser";
import {usersRouter} from './routers/user.controllers';
import {groupsRouter} from "./routers/group.controllers";

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
    return console.log(`Express is listening at http://localhost:${port}`);
});