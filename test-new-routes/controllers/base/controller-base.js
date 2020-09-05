import path from 'path';

import { Logger } from '../../../utils/loggers';

export class ControllerBase {
    /** @type {InstanceType[]} */
    static __constructorParams = [ Logger ];

    constructor(logger, request, response) {
        if (new.target === ControllerBase) {
            throw new TypeError('Cannot construct ControllerBase instances directly');
        }

        this.__type__ = new.target;

        /** @type {Logger} */
        this.logger = logger;

        /** @type {IncomingMessage & {params?: object, body?: object}} */
        this.request = request;

        /** @type {ServerResponse} */
        this.response = response;
    }

    /**
     * @param {string} viewName
     */
    getViewPath(viewName) {
        const appDir = path.dirname(require.main.filename);
        const publicPath = path.join(appDir, 'public');

        const area = this.__type__.area;
        if (area) {
            return path.join(publicPath, 'views', area, `${viewName}.html`);
        }
        return path.join(publicPath, 'views', `${viewName}.html`);
    }

    /**
     * @param {string} viewName
     */
    view(viewName) {
        const pathToView = this.getViewPath(viewName);
        this.response.sendFile(pathToView);
    }

    /**
     * @param {any} model
     */
    ok(model) {
        if (typeof model !== 'object') {
            this.response.send(model);
            return;
        }

        const json = JSON.stringify(model);
        this.response.send(json);
    }
}
