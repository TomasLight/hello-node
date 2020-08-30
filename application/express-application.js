import { Application, Router } from 'express';

import { Application as ApplicationBase} from './application';

export class ExpressApplication extends ApplicationBase {
    constructor(express) {
        super();

        /** @type {Application} */
        this.express = express;
    }

    /** @param {string} area */
    area(area) {
        /** @type {IRouter} */
        this.router = Router();
        this.express.use(`/${area}`, this.router);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    get(url, action) {
        if (!!this.router) {
            return this.router.get(url, action);
        }
        return this.express.get(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    post(url, action) {
        if (!!this.router) {
            return this.router.post(url, action);
        }
        return this.express.post(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    put(url, action) {
        if (!!this.router) {
            return this.router.put(url, action);
        }
        return this.express.put(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    patch(url, action) {
        if (!!this.router) {
            return this.router.patch(url, action);
        }
        return this.express.patch(url, action);
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    delete(url, action) {
        if (!!this.router) {
            return this.router.delete(url, action);
        }
        return this.express.delete(url, action);
    }
}
