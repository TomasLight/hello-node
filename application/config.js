import { DependencyInjection } from '../utils/dependency-injection';
import { Application } from './application';
import { ExpressApplication } from './express-application';

/** @param {Application} expressApp */
function register(expressApp) {
    DependencyInjection.registerType(ExpressApplication).as(Application).with(expressApp);
}

export { register };
