import { IoC } from '../utils/ioc';
import { Logger } from '../utils/loggers';
import { Application } from '../application';
import { SiteController } from './site-controller';
import { UsersController } from './users-controller';

function register() {
    IoC.register(
        SiteController,
        SiteController,
        IoC.resolve(Logger),
        IoC.resolve(Application)
    );

    IoC.register(
        UsersController,
        UsersController,
        IoC.resolve(Logger),
        IoC.resolve(Application)
    );
}

export { register };
