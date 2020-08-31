import { DependencyInjection } from '../dependency-injection';
import { Logger } from './logger';
import { FileLogger } from './file';

function register() {
    DependencyInjection.registerType(FileLogger).as(Logger);
}

export { register };
