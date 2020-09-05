import path from 'path';
import fs from 'fs';

import { Logger } from '../utils/loggers';

const HTTP_METHODS = [ 'get', 'post', 'put', 'patch', 'delete' ];

class MvcMiddleware {
    /**
     * @param {import('express').Application} applicationInstance
     * @param {import('express).Router} createRouter
     * @param {import('cheap-di).container} [container]
     */
    static connect(applicationInstance, createRouter, container) {
        const appDir = path.dirname(require.main.filename);
        const directoryPath = path.join(appDir, 'controllers');
        new MvcMiddleware(applicationInstance, createRouter, container)
            .registerControllers(directoryPath)
            .run();
    }

    constructor(applicationInstance, createRouter, container) {
        /** @type {import('express').Application} */
        this.applicationInstance = applicationInstance;

        /** @type {import('express).Router} */
        this.createRouter = createRouter;

        /** @type {import('cheap-di).container} */
        this.container = container || {
            resolve: (controllerClass, ...args) => new controllerClass(...args),
        };
    }

    registerControllers(directoryPath) {
        const fileNames = fs.readdirSync(directoryPath);

        fileNames.forEach(name => {
            const pathToController = path.join(directoryPath, name);
            if (fs.lstatSync(pathToController).isDirectory()) {
                this.registerControllers(pathToController);
                return;
            }

            const ControllerClass = require(pathToController).default;
            if (!ControllerClass) {
                const logger = this.container.resolve(Logger);
                logger.info(`${name} has no default import to register it as controller`);
                return;
            }

            const properties = Object.keys(ControllerClass);
            const hasAnyHttpMethodProperty = properties.some(property => HTTP_METHODS.indexOf(property) >= 0);

            if (!hasAnyHttpMethodProperty) {
                const logger = this.container.resolve(Logger);
                logger.error(`controller (${name}) does not meet the requirements for controllers`);
                return;
            }

            this.register(ControllerClass);
        });

        return this;
    }

    register(ControllerClass) {
        const router = this.createRouter();

        HTTP_METHODS.forEach(httpMethod => {
            const routes = ControllerClass[httpMethod];
            if (!routes) {
                return;
            }

            Object.keys(routes).forEach(route => {
                let middleware;

                /** @type {string | any[]} */
                const settings = routes[route];
                if (typeof settings === 'string') {
                    middleware = this.createMiddleware(ControllerClass, settings);
                }
                else {
                    const actionName = settings[0];
                    const routeConfig = settings[1];
                    middleware = this.createMiddleware(
                        ControllerClass,
                        actionName,
                        routeConfig.params,
                        routeConfig.body
                    );
                }

                if (ControllerClass.area && route.startsWith('/')) {
                    this.applicationInstance[httpMethod](route, middleware);
                }
                else if (route.startsWith('/')) {
                    router[httpMethod](route, middleware);
                }
                else {
                    router[httpMethod](`/${route}`, middleware);
                }
            });
        });

        if (ControllerClass.area) {
            this.applicationInstance.use(ControllerClass.area, router);
        }
        else if (router.stack.length) {
            this.applicationInstance.use(router);
        }
    }

    /**
     * @param {InstanceType} ControllerClass
     * @param {string} actionName
     * @param {string[]} [params]
     * @param {boolean} [body]
     * */
    createMiddleware(ControllerClass, actionName, params, body) {
        const container = this.container;

        /**
         * @param {Request<ParamsDictionary, any, any, ParsedQs>} request
         * @param {Response<any>} response
         * @param {NextFunction} next
         */
        function middleware(request, response, next) {
            const controller = container.resolve(ControllerClass, request, response);

            let args = [];
            if (params && Array.isArray(params)) {
                args = params.map(paramName => request.params[paramName]);
            }
            if (body) {
                args.push(request.body);
            }

            controller[actionName].apply(controller, args);
        }

        return middleware;
    }

    run() {
        return function (request, response, next) {
            next();
        };
    }
}

export { MvcMiddleware };
