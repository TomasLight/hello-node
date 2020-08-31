import { extractEnvironmentVariables } from './utils/variables';
import { register as registerApplication } from './application/config';
import { register as registerRepositories } from './data.fake/config';
import { register as registerServices } from './domain.services/config';
import { register as registerLogger } from './utils/loggers/config';

function setupEnv() {
    const envVariables = extractEnvironmentVariables();
    Object.assign(process.env, envVariables);
}

/** @param {Application} expressApp */
function registerDependencies(expressApp) {
    registerLogger();
    registerApplication(expressApp);
    registerRepositories();
    registerServices();
}

export {
    setupEnv,
    registerDependencies,
};
