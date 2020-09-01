import { container } from 'cheap-di';
import { Application } from './application';
import { ExpressApplication } from './express-application';

/** @param {Application} expressApp */
function register(expressApp) {
    container.registerType(ExpressApplication).as(Application).with(expressApp);
}

export { register };
