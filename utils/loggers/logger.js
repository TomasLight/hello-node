class Logger {
    constructor() {
        if (new.target === Logger) {
            throw new TypeError('Cannot construct Logger instances directly');
        }
    }

    /**
     * @method
     * @name log
     * @param {string} message
     * @param {'debug' | 'info' | 'warning' | 'error'} eventKind
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    log(message, eventKind) {
    }

    /**
     * @method
     * @name debug
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    debug(message) {
    }

    /**
     * @method
     * @name debug
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    info(message) {
    }

    /**
     * @method
     * @name debug
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    warning(message) {
    }

    /**
     * @method
     * @name debug
     * @param {string} message
     * @returns {void}
     * @throws {Error} Invalid eventKind value
     * */
    error(message) {
    }
}

export { Logger };
