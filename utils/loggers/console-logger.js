import { Logger } from './logger';

class ConsoleLogger extends Logger {
    log(message, eventKind) {
        switch (eventKind) {
            case 'debug':
                console.log(' +++ DEBUG +++ ');
                console.log(message);
                console.log(' --- DEBUG --- ');
                break;

            case 'info':
                console.log(' +++ INFO +++ ');
                console.log(message);
                console.log(' --- INFO --- ');
                break;

            case 'warning':
                console.log(' +++ WARNING +++ ');
                console.log(message);
                console.log(' --- WARNING --- ');
                break;

            case 'error':
                console.log(' +++ ERROR +++ ');
                console.log(message);
                console.log(' --- ERROR --- ');
                break;

            default:
                throw new Error(`Invalid eventKind: ${eventKind}`);
        }
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
