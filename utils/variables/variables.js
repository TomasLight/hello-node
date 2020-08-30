export class Variables {
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
