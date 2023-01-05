import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from "body-parser";
import {router} from './routes/routes'

const server = express();
const port = process.env.PORT || 8080;
server.use(helmet());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(router);

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('Home page');
});

server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});