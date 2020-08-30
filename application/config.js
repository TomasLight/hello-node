import { DependencyInjection } from '../utils/dependency-injection';
import { Application } from './application';
import { ExpressApplication } from './express-application';

/** @param {Application} expressApp */
function register(expressApp) {
    DependencyInjection.register(Application, ExpressApplication, expressApp);
}

export { register };
