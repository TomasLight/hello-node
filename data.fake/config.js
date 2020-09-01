import { container } from 'cheap-di';
import { UserRepository } from '../data/users';
import { FakeUserRepository } from './fake-user-repository';

function register() {
    container.registerType(FakeUserRepository).as(UserRepository);
}

export { register };
