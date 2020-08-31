import { DependencyInjection } from '../utils/dependency-injection';
import { UserRepository } from '../data/users';
import { FakeUserRepository } from './fake-user-repository';

function register() {
    DependencyInjection.registerType(FakeUserRepository).as(UserRepository);
}

export { register };
