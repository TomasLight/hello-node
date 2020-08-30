import { IoC } from '../ioc';
import { Logger } from './logger';
import { FileLogger } from './file';

function register() {
    IoC.register(Logger, FileLogger);
}

export { register };
