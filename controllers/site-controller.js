import { ControllerBase } from './base/controller-base';

export class SiteController extends ControllerBase {
    static get = {
        '/': 'indexPage',
        index: 'indexPage',
        about: 'aboutPage',
        home: 'homePage',
        form: 'formPage',
        'test/:testId': ['test', { params: [ 'testId' ] }],
    }
    static post = {
        form: 'form',
    }

    indexPage() {
        return this.view('index');
    }

    aboutPage() {
        return this.view('about');
    }

    homePage() {
        return this.view('home');
    }

    formPage() {
        return this.view('form');
    }

    test(testId) {
        return this.ok({
            id: 123,
            name: 'qqq',
            testId,
        });
    }

    form(body) {
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

export default SiteController;
