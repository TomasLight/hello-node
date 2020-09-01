import path from 'path';

import { Application } from '../../application';
import { Logger } from '../../utils/loggers';

/**
 * @typedef ActionArgs
 * @property {string[]} [params]
 * @property {boolean} [body]
 * */

export class ControllerBase {
    /** @type {InstanceType[]} */
    static __constructorParams = [ Logger, Application ];

    constructor(logger, application) {
        if (new.target === ControllerBase) {
            throw new TypeError('Cannot construct ControllerBase instances directly');
        }

        /** @type {Logger} */
        this.logger = logger;

        /** @type {Application} */
        this.application = application;

        Object.defineProperty(this, 'publicPath', {
            get() {
                const appDir = path.dirname(require.main.filename);
                return path.join(appDir, 'public');
            }
        });
    }

    /**
     * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     */
    route(method, url, action, args) {
        const boundedAction = this.bind(action, args);
        switch (method) {
            case 'GET':
                this.application.get(url, boundedAction);
                break;

            case 'POST':
                this.application.post(url, boundedAction);
                break;

            case 'PUT':
                this.application.put(url, boundedAction);
                break;

            case 'PATCH':
                this.application.patch(url, boundedAction);
                break;

            case 'DELETE':
                this.application.delete(url, boundedAction);
                break;

            default:
                throw new Error(`Invalid passed method (${method})`);
        }
    }

    /**
     * Bind controller action call with controller context
     * @param {function} action
     * @param {ActionArgs} [actionArgs]
     */
    bind(action, actionArgs = {}) {
        return function (request, response) {
            /** @type {IncomingMessage} */
            this.request = request;

            /** @type {ServerResponse} */
            this.response = response;

            if (!actionArgs) {
                action.call(this);
            }

            let args = [];

            if (Array.isArray(actionArgs.params)) {
                args = actionArgs.params.map(paramName => this.request.params[paramName]);
            }
            if (actionArgs.body) {
                args.push(this.request.body);
            }

            action.apply(this, args);
        }.bind(this);
    }

    /**
     * @param {string} area
     */
    area(area) {
        this.application.area(area);

        this.getViewPath = function (viewName) {
            return path.join(this.publicPath, area, `${viewName}.html`);
        };
    }

    /**
     * @param {string} viewName
     */
    view(viewName) {
        const pathToView = this.getViewPath(viewName);
        this.response.sendFile(pathToView);
    }

    /**
     * @param {string} viewName
     */
    getViewPath(viewName) {
        return path.join(this.publicPath, `${viewName}.html`);
    }

    /**
     * @param {object} model
     */
    ok(model) {
        const json = JSON.stringify(model);
        this.response.send(json);
    }
}
