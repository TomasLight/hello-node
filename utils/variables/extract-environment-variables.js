import fs from 'fs';

import { Variables } from './variables';

/** @param {string} file */
function getFileLines(file) {
    return file.split(/\r?\n/);
}

function extractEnvironmentVariables() {
    const file = fs.readFileSync('./.env', 'utf-8');
    const lines = getFileLines(file);

    const variables = new Variables();
    lines.forEach(variables.addVariableFromString);

    return variables.result;
}

export { extractEnvironmentVariables };
