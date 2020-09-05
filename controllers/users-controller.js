import { UserService } from '../domain/users';
import { ControllerBase } from './base/controller-base';

export class UsersController extends ControllerBase {
    static area = '/users';
    static get = {
        '/api/users/list': 'list',
        '/api/users/:userId': ['getById', { params: [ 'userId' ] }],

        '/users': 'userListPage',
        ':userId': ['userPage', { params: [ 'userId' ] }],
    }
    static post = {
        '/api/users/add': ['getById', { body: true }],
    }

    static __constructorParams = ControllerBase.__constructorParams.concat([ UserService ]);

    constructor(logger, userService, request, response) {
        super(logger, request, response);

        /** @type {UserService} */
        this.userService = userService;
    }

    userListPage() {
        return this.view('list');
    }

    /** @param {number} userId */
    userPage(userId) {
        return this.view('user');
    }


    list() {
        const users = this.userService.list();
        return this.ok(users);
    }

    /** @param {number} userId */
    getById(userId) {
        const user = this.userService.getById(userId);
        return this.ok(user);
    }

    /** @param {{name: string}} */
    add({ name }) {
        const user = this.userService.add(name);
        return this.ok(user);
    }
}

export default UsersController;
