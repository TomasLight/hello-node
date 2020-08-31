/**
 * @typedef {function} RegisteredInstanceType
 * @property {InstanceType[]} __constructorParams
 * @property {any[]} [__injectionParams]
 */

/** @type {Map<InstanceType, RegisteredInstanceType>} */
const dependencies = new Map();

/**
 * @param {InstanceType & {__constructorParams: InstanceType[]}} instanceType
 * @param {any[]} [args]
 */
function makeInstance(instanceType, args) {
    const implementation = dependencies.get(instanceType);
    if (typeof implementation !== 'function') {
        return implementation;
    }

    const injectionParams = implementation.__injectionParams || [];
    return new implementation(...[
        ...injectionParams,
        ...args,
    ]);
}

const DependencyInjection = {
    /** @param {InstanceType} implementationType */
    registerType: function (implementationType) {
        return {
            /** @param {InstanceType} instanceType */
            as: (instanceType) => {
                if (dependencies.has(instanceType)) {
                    throw new Error(`The instance type (${instanceType.name}) is already registered`);
                }
                dependencies.set(instanceType, implementationType);

                return {
                    /** @param {any[]} injectionParams */
                    with: (...injectionParams) => {
                        implementationType.__injectionParams = injectionParams;
                    },
                };
            },
        };
    },

    /** @param {any} instance */
    registerInstance: function (instance) {
        return {
            /** @param {InstanceType} instanceType */
            as: (instanceType) => {
                if (dependencies.has(instanceType)) {
                    throw new Error(`The instance type (${instanceType.name}) is already registered`);
                }
                dependencies.set(instanceType, instance);
            },
        };
    },

    /** @param {InstanceType & {__constructorParams: InstanceType[]}} instanceType */
    resolve: function (instanceType, ...args) {
        if (dependencies.has(instanceType)) {
            return makeInstance(instanceType, args);
        }

        if (!instanceType.__constructorParams || !Array.isArray(instanceType.__constructorParams)) {
            throw new Error(`The ${instanceType.name} cannot be resolved by Dependency Injection`);
        }

        const dependencyArguments = [];
        instanceType.__constructorParams.forEach(type => {
            const instance = DependencyInjection.resolve(type);
            dependencyArguments.push(instance);
        });

        return new instanceType(...[
            ...dependencyArguments,
            ...args,
        ]);
    },
}

export { DependencyInjection };
