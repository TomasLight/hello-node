import { IoC } from '../utils/ioc';
import { Application } from './application';
import { ExpressApplication } from './express-application';

/** @param {Application} expressApp */
function register(expressApp) {
    IoC.register(Application, ExpressApplication, expressApp);
}

export { register };
