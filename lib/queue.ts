
export default class Queue {

    private items: {
        resolve: any,
        reject: any,
        fun: Function,
        context: any,
        args: any[]
    }[] = [];
    private running = false;

    /**
     * Wraps (decorates) a function. When called puts the function into a queue
     * @param fun
     * @returns
     */
    // eslint-disable-next-line no-unused-vars
    wrap<A extends Array<any>, R>(fun: (...args: A) => Promise<R>): (...args: A) => Promise<R> {

        const _this = this;

        return function(this: any, ...args: A) {
            return new Promise((resolve, reject) => {

                // Enqueue the method
                _this.items.push({
                    resolve,
                    reject,
                    fun,
                    context: this,
                    args
                });

                // Check if the queue must be started
                if(!_this.running) setTimeout(_this.next.bind(_this), 0);
            });
        };
    }

    next(): void {
        const item = this.items.shift();
        if (!item) {
            this.running = false;
            return;
        }

        // Execute the function
        let error = undefined;
        let result;
        try {
            result = item.fun.apply(item.context, item.args);
        } catch (err) {
            error = {
                value: err
            };
        }

        // Resolve the promise
        if(error) {
            item.reject(error.value);
        } else {
            item.resolve(result);
        }

        setTimeout(this.next.bind(this), 0);
    }
}
