import { container } from 'cheap-di';
import { DomainUserService } from './domain-user-service';
import { UserService } from '../domain/users';

function register() {
    container.registerType(DomainUserService).as(UserService);
}

export { register };
