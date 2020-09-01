import { Logger } from './logger';

class ConsoleLogger extends Logger {
    log(message, eventKind) {
        console.log(`\n${new Date().toISOString()}`);
        switch (eventKind) {
            case 'debug':
                console.log('DEBUG');
                break;

            case 'info':
                console.log('INFO');
                break;

            case 'warning':
                console.log('WARNING');
                break;

            case 'error':
                console.log('ERROR');
                break;

            default:
                throw new Error(`Invalid eventKind: ${eventKind}`);
        }
        console.log(message);
    }

    debug(message) {
        this.log(message, 'debug');
    }

    info(message) {
        this.log(message, 'info');
    }

    warning(message) {
        this.log(message, 'warning');
    }

    error(message) {
        this.log(message, 'error');
    }
}

export { ConsoleLogger };
