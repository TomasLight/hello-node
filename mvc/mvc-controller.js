import path from 'path';

export class MvcController {
    constructor(request, response) {
        if (new.target === MvcController) {
            throw new TypeError('Cannot construct MvcController instances directly');
        }

        this.__type__ = new.target;
        Object.defineProperty(this, '__type__', {
            configurable: false,
            enumerable: false,
            writable: false,
        });

        /** @type {IncomingMessage & {params?: object, body?: object}} */
        this.request = request;

        /** @type {ServerResponse} */
        this.response = response;
    }

    /**
     * @param {string} viewName
     * @param {string} [area]
     */
    getViewPath(viewName, area) {
        const appDir = path.dirname(require.main.filename);
        const publicPath = path.join(appDir, 'public');

        if (area) {
            return path.join(publicPath, 'views', area, `${viewName}.html`);
        }
        return path.join(publicPath, 'views', `${viewName}.html`);
    }

    /**
     * @param {string} viewName
     */
    view(viewName) {
        const pathToView = this.getViewPath(viewName, this.__type__.area);
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
