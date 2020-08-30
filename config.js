const { extractEnvironmentVariables } = require('./utils/extract-environment-variables');
const application = require('./application/config');
const controllers = require('./controllers/config');
const logger = require('./utils/loggers/config');

function setupEnv() {
    const envVariables = extractEnvironmentVariables();
    Object.assign(process.env, envVariables);
}

/** @param {Application} expressApp */
function registerDependencies(expressApp) {
    logger.register();
    application.register(expressApp);
    controllers.register();
}

module.exports = {
    setupEnv,
    registerDependencies,
};
