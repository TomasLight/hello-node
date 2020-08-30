class Application {
    constructor() {
        if (new.target === Application) {
            throw new TypeError(`Cannot construct Application instance directly`);
        }
    }

    /** @param {string} area */
    area(area) {
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    get(url, action) {
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    post(url, action) {
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    put(url, action) {
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    patch(url, action) {
    }

    /**
     * @param {string} url
     * @param {function} action
     */
    delete(url, action) {
    }
}

export { Application };
