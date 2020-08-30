import { IoC } from '../utils/ioc';
import { Logger } from '../utils/loggers';
import { Application } from '../application';
import { UserRepository } from '../data/user-repository';

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
        IoC.resolve(Application),
        IoC.resolve(UserRepository)
    );
}

export { register };
