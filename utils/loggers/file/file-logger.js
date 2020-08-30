import { Logger } from '../logger';
import { FileWriter } from './file-writer';
import { MessageBlock } from './message-block';

class FileLogger extends Logger {
    constructor() {
        super();
        this.fileWriter = new FileWriter();
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

    log(message, eventKind) {
        const messageBlock = new MessageBlock();
        this.fileWriter.blocks.push(messageBlock);

        switch (eventKind) {
            case 'debug':
                messageBlock.append('DEBUG');
                break;

            case 'info':
                messageBlock.append('INFO');
                break;

            case 'warning':
                messageBlock.append('WARNING');
                break;

            case 'error':
                messageBlock.append('ERROR');
                break;

            default:
                throw new Error(`Invalid eventKind: ${eventKind}`);
        }

        messageBlock.append(message);
        messageBlock.end();
        this.fileWriter.write();
    }
}

export { FileLogger };
