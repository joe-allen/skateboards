const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
	try {
		const { item } = await Cache(
			// 'http://localhost:8888/.netlify/functions/cl',
			'https://lucid-dijkstra-0e5a96.netlify.app/.netlify/functions/cl',
			{
				duration: '3m',
				type: 'json'
			}
		);

		return item;
	} catch (error) {
		return `There is an error b: ${error}`;
	}
}
