import { IoC } from '../utils/ioc';
import { UserRepository } from '../data/user-repository';
import { FakeUserRepository } from './fake-user-repository';

function register() {
    IoC.register(UserRepository, FakeUserRepository);
}

export { register };
