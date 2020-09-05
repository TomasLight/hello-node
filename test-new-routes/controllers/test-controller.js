import { ControllerBase } from './base/controller-base';

export class TestController extends ControllerBase {
    static area = 'test';
    static get = {
        list: 'listEndPoint',
        'some/:userId': ['someEndPoint', { params: [ 'userId' ], body: true, }],
    }

    // constructor(logger, request, response) {
    //     super(logger, request, response);
    // }

    // list() {
    //     return this.view('list');
    // }

    listEndPoint() {
        this.ok('TEST controller - list');
    }

    someEndPoint(userId) {
        this.ok(`TEST controller - some user ${userId}`);
    }
}

export default TestController;
