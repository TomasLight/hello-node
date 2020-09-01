export class Application {
    constructor() {
        if (new.target === Application) {
            throw new TypeError(`Cannot construct Application instance directly`);
        }
    }

    /** @param {string} area */
    area(area) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    get(url, action) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    post(url, action) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    put(url, action) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    patch(url, action) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    delete(url, action) {
        throw new Error("Not implemented");
    }
}
