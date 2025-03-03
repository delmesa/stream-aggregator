/**
 * Returns a shuffled shallow copy of a given array.
 * @param {any[]} arr - array to shuffle
 * @returns {any[]}
 */
export const shuffle = (arr) => {
	const copy = [...arr];
	for (let i = copy.length - 1; i >= 0; i--) {
		const swap = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[swap]] = [copy[swap], copy[i]];
	}

	return copy;
};
