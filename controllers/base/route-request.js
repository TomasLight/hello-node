/**
 * @typedef ActionArgs
 * @property {string[]} [params]
 * @property {boolean} [body]
 * */

/**
 * @typedef RequestHandler
 * @param {string} url
 * @param {function} action
 * @param {ActionArgs?} args
 */

export class RouteRequest {
    constructor(logger, application, controllerRef) {
        this.logger = logger;

        /** @type {Application} */
        this.application = application;

        /** @type {Object} */
        this.controllerRef = controllerRef;

        this.get = this.get.bind(this);
    }

    /**
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     * @returns {RouteRequest}
     */
    get(url, action, args) {
        const boundedAction = this._bind(action, args);
        this.application.get(url, boundedAction);
        return this;
    }

    /**
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     * @returns {RouteRequest}
     */
    post(url, action, args) {
        const boundedAction = this._bind(action, args);
        this.application.post(url, boundedAction);
        return this;
    }

    /**
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     * @returns {RouteRequest}
     */
    put(url, action, args) {
        const boundedAction = this._bind(action, args);
        this.application.put(url, boundedAction);
        return this;
    }

    /**
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     * @returns {RouteRequest}
     */
    patch(url, action, args) {
        const boundedAction = this._bind(action, args);
        this.application.patch(url, boundedAction);
        return this;
    }

    /**
     * @param {string} url
     * @param {function} action
     * @param {ActionArgs?} args
     * @returns {RouteRequest}
     */
    delete(url, action, args) {
        const boundedAction = this._bind(action, args);
        this.application.delete(url, boundedAction);
        return this;
    }

    /**
     * Bind controller action call with controller context
     * @param {function} action
     * @param {ActionArgs} [actionArgs]
     */
    _bind(action, actionArgs = {}) {
        /**
         * @param {IncomingMessage & {params?: object, body?: object}} request
         * @param {ServerResponse} response
         */
        function handleRequest(request, response) {
            this.controllerRef.request = request;
            this.controllerRef.response = response;

            if (!actionArgs) {
                action.call(this.controllerRef);
            }

            let args = [];

            if (Array.isArray(actionArgs.params)) {
                args = actionArgs.params.map(paramName => request.params[paramName]);
            }
            if (actionArgs.body) {
                args.push(request.body);
            }

            this.logger.info(
                `${request.method.toUpperCase()}: ${this.controllerRef.constructor.name}.${action.name}`
            );
            action.apply(this.controllerRef, args);
        }

        return handleRequest.bind(this);
    }
}
