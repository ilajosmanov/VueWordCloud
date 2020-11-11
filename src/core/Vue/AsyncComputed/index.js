import Function_is from '../../Function/is';
import Function_noop from '../../Function/noop';

import Context from './Context';

const prefix = 'asyncComputed_';
const prefixPromise = prefix + 'promise_';
const prefixTrigger = prefix + 'trigger_';

export default function(asyncComputed) {
	let options = {
		data() {
			let returns = {};
			Object.keys(asyncComputed).forEach(key => {
				returns[prefixTrigger + key] = {};
			});
			return returns;
		},

		computed: {},

		beforeCreate() {
			let currentContexts = new Set();

			Object.keys(asyncComputed).forEach(key => {
				asyncComputed[key].errorHandler = Function_noop;
				let firstCall = true;
				let currentContext;

				this.$options.computed[key] = function() {
					this[prefixTrigger + key];
					this[prefixPromise + key];
					return asyncComputed[key].default;
				};

				this.$options.computed[prefixPromise + key] = function() {
					if (currentContext) {
						currentContext.interrupt();
						currentContexts.delete(currentContext);
					}
					if (firstCall) {
						firstCall = false;
						if (Function_is(asyncComputed[key].default)) {
							asyncComputed[key].default = asyncComputed[key].default.call(this);
						}
					}
					let context = new Context(asyncComputed[key].default);
					currentContext = context;
					currentContexts.add(currentContext);
					new Promise(resolve => {
						resolve(asyncComputed[key].get.call(this, context));
					})
						.then(value => {
							context.throwIfInterrupted();
							asyncComputed[key].default = value;
							this[prefixTrigger + key] = {};
						})
						.catch(asyncComputed[key].errorHandler);
				};
			});
		},
	};

	return options;
}
