import fs from 'fs';

/** @param {string} file */
function getFileLines(file) {
    return file.split(/\r?\n/);
}

class Variables {
    constructor() {
        this.result = {};
        this.addVariableFromString = this.addVariableFromString.bind(this);
    }

    /** @param {string} string */
    addVariableFromString(string) {
        if (!string || string.startsWith('#')) {
            return;
        }

        // we can't just split by '=' because variable may contains multiple '=' signs (for example, cookie)

        const index = string.indexOf('=');
        const name = string.substr(0, index);
        const value = string.substr(index + 1);

        this.result[name] = value;
    }
}

function extractEnvironmentVariables() {
    const file = fs.readFileSync('./.env', 'utf-8');
    const lines = getFileLines(file);

    const variables = new Variables();
    lines.forEach(variables.addVariableFromString);

    return variables.result;
}

export { extractEnvironmentVariables };
