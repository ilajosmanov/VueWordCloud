import startAnimationLoop from '../core/startAnimationLoop';

export default function() {
	startAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}

		Promise.prototype.finally = Promise.prototype.finally || {
			finally (fn) {
				const onFinally = callback => Promise.resolve(fn()).then(callback);
				return this.then(
					result => onFinally(() => result),
					reason => onFinally(() => Promise.reject(reason))
				);
			}
		}.finally;

		this.updateElementSize();
	}, 1000);
}
