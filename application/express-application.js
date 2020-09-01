import { Application, Router } from 'express';

import { Application as ApplicationBase} from './application';

export class ExpressApplication extends ApplicationBase {
    constructor(express) {
        super();

        /** @type {Application} */
        this._express = express;

        /** @type {IRouter[]} */
        this._routers = [];

        Object.defineProperty(this, '_router', {
            get() {
                if (!this._routers.length) {
                    return undefined;
                }
                return this._routers[this._routers.length - 1];
            },
        });
    }

    /** @param {string} area */
    area(area) {
        this._routers.push(Router());
        this._express.use(area, this._router);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    get(url, action) {
        if (this._router) {
            return this._router.get(url, action);
        }
        return this._express.get(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    post(url, action) {
        if (this._router) {
            return this._router.post(url, action);
        }
        return this._express.post(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    put(url, action) {
        if (this._router) {
            return this._router.put(url, action);
        }
        return this._express.put(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    patch(url, action) {
        if (this._router) {
            return this._router.patch(url, action);
        }
        return this._express.patch(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    delete(url, action) {
        if (this._router) {
            return this._router.delete(url, action);
        }
        return this._express.delete(url, action);
    }
}
