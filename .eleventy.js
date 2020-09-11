const sortOrder = require('./src/utilities/sort-by-order.js')

module.exports = config => {
  config.addPassthroughCopy('./src/images/');

  // loop over each template / page
  // config.addCollection('test', collection => {
  //   [...collection.items].forEach(el => {
  //     console.log('11ty_item:', el);
  //   })
  //   return collection
  // });

  // get by tags
  // config.addCollection('tagCool', collection => {
  //   let cool = collection.getFilteredByTag('cool');
  //   let coolHappy = collection.getFilteredByTags('cool', 'happy');
  //   console.log('----------tag-length', coolHappy.length);
  //   return false;
  // });


  config.addCollection('skateboards', collection => {
    return sortOrder(collection.getFilteredByGlob('./src/skateboards/*.md'));
  });

  config.addCollection('featured_skateboards', collection => {
    return sortOrder(collection.getFilteredByGlob('./src/skateboards/*.md')
    .filter(board => board.data.featured));
  })

	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',

		dir: {
			input: 'src',
			output: 'dist'
		}
	}
}