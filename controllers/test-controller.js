import { ControllerBase } from './base/controller-base';
import { UserService } from '../domain/users';



function HttpGet(target, property, descriptor) {
    return descriptor;
}

function Route(area, ...rest) {
    return function (target, property, descriptor) {
        return descriptor;
    }
}

const Policy = Object.freeze({
    NA: 0,
    Guest: 1,
    Moderator: 2,
    Admin: 3,
});

/** @param {Policy} policy */
function Authorize(policy) {
    // return function (target, property, descriptor) {
    return function (target, ...rest) {
        // return descriptor;
        return undefined;
    }
}

export class TestController /*extends ControllerBase*/ {
    // static __constructorParams = ControllerBase.__constructorParams.concat([ UserService ]);

    // constructor(logger, app, userService) {
    //     super(logger, app);
    //
    //     /** @type {UserService} */
    //     this.userService = userService;
    //
    //     this.api('test', page => page
    //         .get('/', this.listPage)
    //         .get('/:userId', this.userPage, {
    //             params: [ 'userId' ],
    //         })
    //     );
    // }
    constructor() {
        this.someList = [];
    }

    @HttpGet
    @Route('list')
    @Authorize(Policy.Moderator)
    listPage() {
        return this.ok('list');
    }

    /** @param {number} userId */
    userPage(userId) {
        return this.view('user');
    }
}
