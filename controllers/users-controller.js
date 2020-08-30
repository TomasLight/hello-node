import { ControllerBase } from './controller-base';

class UsersController extends ControllerBase {
    constructor(logger, app) {
        super(logger, app);

        this.area('users');

        this.route('GET', '/', this.userListPage);
        this.route('GET', '/:userId', this.userPage, {
            params: [ 'userId' ],
        });
        this.route('GET', '/:userId/info/:userName', this.userName, {
            params: [ 'userId', 'userName' ],
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

    /**
     * @param {number} userId
     * @param {string} userName
     */
    userName(userId, userName) {
        this.logger.debug('User controller returns user name');
        return this.ok({
            userId,
            userName,
        });
    }
}

export { UsersController };
