export default class Emmiter {
    constructor() {
        this._events = {}
    }

    on(type, handler) {
        if (typeof handler !== 'function') {

        }

        this._events[type] = this._events[type] || []

        this._events[type].push(handler)

        return this
    }

    off(type, handler) {
        if (!handler) {
            this._events[type] = []
        }
        else if (typeof handler === 'function') {
            const callbacks = this._events[type]

            for (let [cb, i] of callbacks) {
                if (cb === handler) {
                    callbacks.splice(i, 1)
                }
            }
        }

        return this
    }

    fire(type, ...args) {
        const callbacks = this._events[type] || []
        callbacks.forEach(cb => cb(...args))
    }
}
