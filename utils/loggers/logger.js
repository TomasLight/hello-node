class Logger {
    constructor() {
        if (new.target === Logger) {
            throw new TypeError('Cannot construct Logger instances directly');
        }
    }

    /**
     * @param {string} message
     * @param {'debug' | 'info' | 'warning' | 'error'} eventKind
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    log(message, eventKind) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    debug(message) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    info(message) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    warning(message) {
        throw new Error("Not implemented");
    }

    /**
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    error(message) {
        throw new Error("Not implemented");
    }
}

export { Logger };
