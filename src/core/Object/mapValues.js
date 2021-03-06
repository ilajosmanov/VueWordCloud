export default function(object, iteratee) {
	let result = {};
	Object.keys(object).forEach(key => {
		result[key] = iteratee(object[key], key, object);
	});
	return result;
}
