import path from 'path';
import express, { Router } from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { container } from 'cheap-di';

import { setupEnv, registerDependencies } from './config';
import { print } from './utils/application/debug-routes';
import { handleNotFoundMiddleware } from './not-found-middleware';
import { MvcMiddleware } from './mvc/mvc-middleware';

const app = express();

setupEnv();
registerDependencies(app);

const rootPath = path.join(__dirname);
const publicPath = path.join(rootPath, 'public');
const faviconPath = path.join(publicPath, 'img', 'favicon.ico');

app.use(favicon(faviconPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

MvcMiddleware.connect(app, Router, container);

app.use(handleNotFoundMiddleware);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Сервер начал прослушивание запросов на порту ${process.env.PORT}`);
});

app._router.stack.forEach(print.bind(null, []));
