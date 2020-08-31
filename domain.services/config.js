import { DependencyInjection } from '../utils/dependency-injection';
import { DomainUserService } from './domain-user-service';
import { UserService } from '../domain/users';

function register() {
    DependencyInjection.registerType(DomainUserService).as(UserService);
}

export { register };
