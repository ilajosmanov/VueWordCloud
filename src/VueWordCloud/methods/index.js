import updateElementSize from './updateElementSize';

export default {
	updateElementSize,
	trigger(payload) {
		this.$emit('trigger', payload);
	}
};
