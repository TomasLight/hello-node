import { DependencyInjection } from '../dependency-injection';
import { Logger } from './logger';
import { FileLogger } from './file';

function register() {
    DependencyInjection.register(Logger, FileLogger);
}

export { register };
