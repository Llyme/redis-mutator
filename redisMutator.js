const ROOT_KEY = '!mutations';
const WRAPS_KEY = 'wraps';
const MUTATIONS_KEY = 'mutations';
const PREFIXES_KEY = 'prefixes';
const POSTFIXES_KEY = 'postfixes';

export class RedisMutator {
    #object;
    /**
     * @type {string[]}
     */
    #names;

    constructor(object, ...names) {
        this.#object = object;
        this.#names = [];

        for (const name of names)
            if (typeof (name) == 'string')
                this.#names.push(name);

            else
                for (const name0 of name)
                    this.#names.push(name0);

        this.#initialize();

        const wraps = this.#object[ROOT_KEY][WRAPS_KEY];

        for (const name of this.#names)
            if (!(name in wraps)) {
                wraps[name] = true;

                this.#wrap(name);
            }
    }

    #initialize() {
        if (ROOT_KEY in this.#object)
            return;

        if (Object.isFrozen(this.#object))
            throw new Error('Object is frozen!');

        if (Object.isSealed(this.#object))
            throw new Error('Object is sealed!');

        this.#object[ROOT_KEY] = {
            [WRAPS_KEY]: {},
            [MUTATIONS_KEY]: {},
            [PREFIXES_KEY]: {},
            [POSTFIXES_KEY]: {},
        };
    }

    #wrap(name) {
        if (name == ROOT_KEY)
            throw new Error('You can\'t mutate this!');

        const object = this.#object;
        const raw = object[name];

        object[name] = function (...args) {
            const mutations = object[ROOT_KEY][MUTATIONS_KEY];
            const prefixes = object[ROOT_KEY][PREFIXES_KEY];
            const postfixes = object[ROOT_KEY][POSTFIXES_KEY];

            // Prefixes.

            if (name in prefixes)
                for (const hook in prefixes[name])
                    if (hook(name, args) === false)
                        return null;

            // Call function.

            let value = null;

            if (name in mutations)
                value = mutations[name](...args);

            else
                value = raw.call(object, ...args);


            // Postfixes.

            if (name in postfixes)
                for (const hook in postfixes[name])
                    hook(value, name, args);

            return value;
        };
    }

    prefix(hook) {
        const prefixes = this.#object[ROOT_KEY][PREFIXES_KEY];

        for (const name of this.#names) {
            if (!(name in prefixes))
                prefixes[name] = [];

            prefixes[name].push(hook);
        }

        return this;
    }

    postfix(hook) {
        const postfixes = this.#object[ROOT_KEY][POSTFIXES_KEY];

        for (const name of this.#names) {
            if (!(name in postfixes))
                postfixes[name] = [];

            postfixes[name].push(hook);
        }

        return this;
    }

    use(surrogate) {
        const mutations = this.#object[ROOT_KEY][MUTATIONS_KEY];
        const isFunction = typeof (surrogate) == 'function';

        for (const name of this.#names)
            if (isFunction)
                mutations[name] = surrogate;

            else
                mutations[name] = function (...args) {
                    return surrogate[name](...args);
                };

        return this;
    }

    removePrefix(hook) {
        const prefixes = this.#object[ROOT_KEY][PREFIXES_KEY];

        for (const name of this.#names)
            if (name in prefixes)
                prefixes[name].filter(v => v != hook);

        return this;
    }

    removePostfix(hook) {
        const postfixes = this.#object[ROOT_KEY][POSTFIXES_KEY];

        for (const name of this.#names)
            if (name in postfixes)
                postfixes[name].filter(v => v != hook);

        return this;
    }

    remove() {
        const mutations = this.#object[ROOT_KEY][MUTATIONS_KEY];

        for (const name of this.#names)
            if (name in mutations)
                delete mutations[name];

        return this;
    }
}

export function mutate(object, ...names) {
    return new RedisMutator(object, ...names);
}