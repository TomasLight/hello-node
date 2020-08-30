const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { DependencyInjection } = require('./utils/dependency-injection');
const { setupEnv, registerDependencies } = require('./config');
const { SiteController, UsersController } = require('./controllers');

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

DependencyInjection.resolve(SiteController);
DependencyInjection.resolve(UsersController);

app.use((request, response, next) => {
    const filePath = __dirname + '/public/not-found.html';
    response.status(404).sendFile(filePath);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Сервер начал прослушивание запросов на порту ${process.env.PORT}`);
});
