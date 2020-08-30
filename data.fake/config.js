import { DependencyInjection } from '../utils/dependency-injection';
import { UserRepository } from '../data/user-repository';
import { FakeUserRepository } from './fake-user-repository';

function register() {
    DependencyInjection.register(UserRepository, FakeUserRepository);
}

export { register };
