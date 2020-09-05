import path from "path";

import { MvcController } from '../../mvc/mvc-controller';
import { Logger } from '../../utils/loggers';

export class ControllerBase extends MvcController {
    /** @type {InstanceType[]} */
    static __constructorParams = [ Logger ];

    constructor(logger, request, response) {
        super(request, response);
        if (new.target === MvcController) {
            throw new TypeError('Cannot construct MvcController instances directly');
        }

        /** @type {Logger} */
        this.logger = logger;
    }

    /**
     * @param {string} viewName
     * @param {string} [area]
     */
    getViewPath(viewName, area) {
        const appDir = path.dirname(require.main.filename);
        const publicPath = path.join(appDir, 'public');

        if (area) {
            return path.join(publicPath, area, `${viewName}.html`);
        }
        return path.join(publicPath, `${viewName}.html`);
    }
}
