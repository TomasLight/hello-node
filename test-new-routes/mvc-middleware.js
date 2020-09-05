import path from "path";
import fs from "fs";

import { Logger } from '../utils/loggers';

class MvcMiddleware {
    /**
     * @param {import('express').Application} applicationInstance
     * @param {import('express).Router} createRouter
     * @param {import('cheap-di).container} [container]
     */
    static connect(applicationInstance, createRouter, container) {
        const directoryPath = path.join(__dirname, 'controllers');
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

        // if (container) {
        //     /** @type {import('cheap-di).container} */
        //     this.container = container;
        // }
        // else {
        //     /** @type {import('cheap-di).container} */
        //     this.container = {
        //         resolve: (controllerClass, ...args) => new controllerClass(...args),
        //     };
        // }
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
                logger.debug(`controller (${name}) not found`);
                return;
            }

            const properties = Object.keys(ControllerClass);
            const httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
            const hasAnyHttpMethodProperty = properties.some(property => httpMethods.indexOf(property) >= 0);

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

        Object.keys(ControllerClass.get).forEach(route => {
            let _middleware;

            /** @type {string | any[]} */
            const settings = ControllerClass.get[route];
            if (typeof settings === 'string') {
                _middleware = this.setupMiddleware(ControllerClass, settings);
            }
            else {
                const actionName = settings[0];
                const routeConfig = settings[1];
                _middleware = this.setupMiddleware(
                    ControllerClass,
                    actionName,
                    routeConfig.params,
                    routeConfig.body
                );
            }
            router.get(`/${route}`, _middleware);
        });

        if (ControllerClass.area) {
            this.applicationInstance.use(`/${ControllerClass.area}`, router);
        }
        else {
            this.applicationInstance.use('/', router);
        }
    }

    /**
     * @param {InstanceType} ControllerClass
     * @param {string} actionName
     * @param {string[]} [params]
     * @param {boolean} [body]
     * */
    setupMiddleware(ControllerClass, actionName, params, body) {
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

    run () {
        return function(request, response, next) {
            next();
        };
    }
}

export { MvcMiddleware };
