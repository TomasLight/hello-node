const dependencies = new Map();

const DependencyInjection = {
    /**
     * @param {InstanceType} instanceType
     * @param {InstanceType} implementation
     * */
    register: function (instanceType, implementation, ...rest) {
        if (dependencies.has(instanceType)) {
            throw new Error(`The instance type (${instanceType}) already registered`);
        }

        if (typeof implementation !== 'function') {
            throw new Error('Passed implementation is not a function');
        }

        dependencies.set(
            instanceType,
            (...args) => new implementation(
                ...rest,
                ...args,
            )
        );
    },

    /**
     * @param {InstanceType} instanceType
     * */
    resolve: function (instanceType, ...args) {
        if (dependencies.has(instanceType)) {
            /** @type {function} */
            const implementation = dependencies.get(instanceType);
            return implementation.apply(null, args);
        }

        throw new Error(`This class (${instanceType}) is not registered`);
    },
}

export { DependencyInjection };
