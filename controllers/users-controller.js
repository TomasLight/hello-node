import { ControllerBase } from './controller-base';
import { UserService } from '../domain/users';

export class UsersController extends ControllerBase {
    static __constructorParams = ControllerBase.__constructorParams.concat([ UserService ]);

    constructor(logger, app, userService) {
        super(logger, app);

        /** @type {UserService} */
        this.userService = userService;

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
        const users = this.userService.list();
        return this.ok(users);
    }

    getById(userId) {
        const user = this.userService.get(userId);
        return this.ok(user);
    }

    /** @param {{name: string}} */
    add({ name }) {
        const user = this.userService.add(name);
        return this.ok(user);
    }
}
