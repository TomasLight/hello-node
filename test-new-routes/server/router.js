export class Router {
    constructor() {
        if (new.target === Router) {
            throw new Error('Cannot construct Router instance directly');
        }
    }
}
