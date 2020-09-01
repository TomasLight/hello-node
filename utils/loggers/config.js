import { container } from 'cheap-di';
import { Logger } from './logger';
import { FileLogger } from './file';
import { ConsoleLogger } from './console-logger';

function register() {
    container.registerType(ConsoleLogger).as(Logger);
}

export { register };
