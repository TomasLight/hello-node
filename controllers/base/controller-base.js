import path from 'path';

import { Logger } from '../../utils/loggers';
import { Application } from '../../application';
import { RouteRequest } from './route-request';

/**
 * @callback RouteCallback
 * @param {RouteRequest} route
 * @returns {void}
 */

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
        this._application = application;

        /** @type {RouteRequest} */
        this._route = new RouteRequest(logger, application, this);

        Object.defineProperty(this, 'publicPath', {
            get() {
                const appDir = path.dirname(require.main.filename);
                return path.join(appDir, 'public');
            }
        });
    }

    /**
     * @param {string} area
     * @param {RouteCallback} callback
     * */
    api(area, callback) {
        this._application.area(`/api/${area}`);
        callback(this._route);
    }

    /**
     * @param {string} area
     * @param {RouteCallback} callback
     * */
    pages(area, callback) {
        if (area) {
            this._application.area(`/${area}`);
            this.getViewPath = function (viewName) {
                return path.join(this.publicPath, area, `${viewName}.html`);
            };
        }
        else {
            this._application.area(`/`);
            this.getViewPath = function (viewName) {
                return path.join(this.publicPath, `${viewName}.html`);
            };
        }
        callback(this._route);
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
