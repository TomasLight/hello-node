import { DependencyInjection } from '../utils/dependency-injection';
import { Logger } from '../utils/loggers';
import { Application } from '../application';
import { UserRepository } from '../data/user-repository';

import { SiteController } from './site-controller';
import { UsersController } from './users-controller';

function register() {
    DependencyInjection.register(
        SiteController,
        SiteController,
        DependencyInjection.resolve(Logger),
        DependencyInjection.resolve(Application)
    );

    DependencyInjection.register(
        UsersController,
        UsersController,
        DependencyInjection.resolve(Logger),
        DependencyInjection.resolve(Application),
        DependencyInjection.resolve(UserRepository)
    );
}

export { register };
