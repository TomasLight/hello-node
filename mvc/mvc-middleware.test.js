import { MvcMiddleware } from './mvc-middleware';

class Tester {
    constructor() {
        this.appRoute = [];
        this.router = [];
        this.mockApp = {
            /**
             * @param {string | object} areaOrRouter
             * @param _router
             */
            use: (areaOrRouter, _router) => {
                if (_router) {
                    this.router.forEach(route => this.appRoute.push(`${areaOrRouter}${route}`));
                }
                else {
                    this.router.forEach(route => this.appRoute.push(route));
                }
            },
            get: (route) => {
                this.appRoute.push(route);
            },
        };

        this.createMockRouter = this.createMockRouter.bind(this);
    }

    createMockRouter() {
        return {
            get: (route) => {
                this.router.push(route);
            },
            stack: this.router,
        }
    };
}

test('root routing (SiteController)', () => {
    const mockController = {
        area: undefined,
        get: {
            '/': '',
            'index': '',
            'about': '',
            'home': '',
            'form': '',
            'test/:testId': '',
        },
    };

    const output = [
        '/',
        '/index',
        '/about',
        '/home',
        '/form',
        '/test/:testId',
    ];

    const tester = new Tester();
    const middleware = new MvcMiddleware(tester.mockApp, tester.createMockRouter);
    middleware.register(mockController);

    expect(tester.appRoute).toEqual(output);
});

test('root area routing (TestController)', () => {
    const mockController = {
        area: '/test',
        get: {
            'list': '',
            'some/:userId': '',
        },
    };

    const output = [
        '/test/list',
        '/test/some/:userId',
    ];

    const tester = new Tester();
    const middleware = new MvcMiddleware(tester.mockApp, tester.createMockRouter);
    middleware.register(mockController);

    expect(tester.appRoute).toEqual(output);
});

test('root area routing (UserController) 1', () => {
    const mockController = {
        area: '/users',
        get: {
            '/api/users/list': '',
            '/api/users/:userId': '',
            '/users': '',
            ':userId': '',
        },
    };

    const output = [
        '/api/users/list',
        '/api/users/:userId',
        '/users',
        '/users/:userId',
    ];

    const tester = new Tester();
    const middleware = new MvcMiddleware(tester.mockApp, tester.createMockRouter);
    middleware.register(mockController);

    expect(tester.appRoute).toEqual(output);
});
