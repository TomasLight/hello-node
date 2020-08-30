import { ControllerBase } from './controller-base';

class SiteController extends ControllerBase {
    constructor(logger, app) {
        super(logger, app);

        this.route('GET', '/', this.indexPage);
        this.route('GET', '/index', this.indexPage);
        this.route('GET', '/about', this.aboutPage);
        this.route('GET', '/home', this.homePage);
        this.route('GET', '/form', this.formPage);

        this.route('GET', '/test/:testId', this.test, {
            params: [ 'testId' ],
        });
        this.route('POST', '/form', this.form);
    }

    indexPage() {
        this.logger.debug('Site controller returns index page');
        return this.view('index');
    }

    aboutPage() {
        this.logger.debug('Site controller returns about page');
        return this.view('about');
    }

    homePage() {
        this.logger.debug('Site controller returns home page');
        return this.view('home');
    }

    formPage() {
        this.logger.debug('Site controller returns form page');
        return this.view('form');
    }

    test(testId) {
        this.logger.debug('Site controller returns test query result');
        return this.ok({
            id: 123,
            name: 'qqq',
            testId,
        });
    }

    form(body) {
        this.logger.debug('Site controller returns form result');
        let result = {};

        if (!!body) {
            result.message = 'success';
            result.name = body.name;
            result.age = body.age;
        }
        else {
            result = 'failed';
        }

        return this.ok(result);
    }
}

export { SiteController };
