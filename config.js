import { extractEnvironmentVariables } from './utils/variables';
import { register as applicationRegister } from './application/config';
import { register as repositoriesRegister } from './data.fake/config';
import { register as loggerRegister } from './utils/loggers/config';

function setupEnv() {
    const envVariables = extractEnvironmentVariables();
    Object.assign(process.env, envVariables);
}

/** @param {Application} expressApp */
function registerDependencies(expressApp) {
    loggerRegister();
    applicationRegister(expressApp);
    repositoriesRegister();
}

export {
    setupEnv,
    registerDependencies,
};
