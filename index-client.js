import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { container } from 'cheap-di';

import { setupEnv } from './config';
import { Logger } from './utils/loggers';

const app = express();

setupEnv();

const projectFolder = path.join(__dirname, '..');
const clientPublicFolder = path.join(projectFolder, 'hello-node-client', 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(clientPublicFolder));

app.use('/', (request, response) => {
    const viewPath = path.join(clientPublicFolder, 'index.html');
    response.sendFile(viewPath);
});

app.use((request, response, next) => {
    const logger = container.resolve(Logger);
    logger.error(`${request.method} ${request.url} NOT FOUND`);

    const filePath = path.join(__dirname, 'public', 'not-found.html');
    response.status(404).sendFile(filePath);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Сервер начал прослушивание запросов на порту ${process.env.PORT}`);
});
