import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { container } from 'cheap-di';

import { setupEnv, registerDependencies } from './config';
import { SiteController, UsersController, TestController } from './controllers';
import { Logger } from './utils/loggers';
import { print } from './utils/application/debug-routes';

const app = express();

setupEnv();
registerDependencies(app);

const rootPath = path.join(__dirname);
const publicPath = path.join(rootPath, 'public');

app.use(favicon(path.join(publicPath, 'img', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

container.resolve(SiteController);
container.resolve(UsersController);

new TestController();

app.use((request, response, next) => {
    const logger = container.resolve(Logger);
    logger.error(`${request.method} ${request.url} NOT FOUND`);

    const filePath = __dirname + '/public/not-found.html';
    response.status(404).sendFile(filePath);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Сервер начал прослушивание запросов на порту ${process.env.PORT}`);
});

app._router.stack.forEach(print.bind(null, []));
