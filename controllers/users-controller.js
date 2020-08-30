import { ControllerBase } from './controller-base';
import { User } from '../data/user';

export class UsersController extends ControllerBase {
    constructor(logger, app, userRepository) {
        super(logger, app);

        /** @type {UserRepository} */
        this.userRepository = userRepository;

        this.route('GET', '/api/users/list', this.list);
        this.route('GET', '/api/users/:userId', this.getById, {
            params: [ 'userId' ],
        });
        this.route('POST', '/api/users/add', this.add, {
            body: true,
        });

        this.area('users');

        this.route('GET', '/', this.userListPage);
        this.route('GET', '/:userId', this.userPage, {
            params: [ 'userId' ],
        });
    }

    userListPage() {
        this.logger.debug('User controller returns user list page');
        return this.view('list');
    }

    /** @param {number} userId */
    userPage(userId) {
        this.logger.debug('User controller returns user page');
        return this.view('user');
    }


    list() {
        const users = this.userRepository.list();
        return this.ok(users);
    }

    getById(userId) {
        const user = this.userRepository.get(userId);
        return this.ok(user);
    }

    /** @param {{name: string}} */
    add({ name }) {
        const user = new User({ name });
        this.userRepository.add(user);
        return this.ok(user);
    }
}
