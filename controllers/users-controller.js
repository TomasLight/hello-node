import { ControllerBase } from './base/controller-base';
import { UserService } from '../domain/users';

export class UsersController extends ControllerBase {
    static __constructorParams = ControllerBase.__constructorParams.concat([ UserService ]);

    constructor(logger, app, userService) {
        super(logger, app);

        /** @type {UserService} */
        this.userService = userService;

        this.api('users', api => api
            .get('/list', this.list)
            .get('/:userId', this.getById, {
                params: [ 'userId' ],
            })
            .post('/add', this.getById, {
                body: true,
            })
        );

        this.pages('users', page => page
            .get('/', this.userListPage)
            .get('/:userId', this.userPage, {
                params: [ 'userId' ],
            })
        );
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
        const user = this.userService.get(userId);
        return this.ok(user);
    }

    /** @param {{name: string}} */
    add({ name }) {
        const user = this.userService.add(name);
        return this.ok(user);
    }
}
