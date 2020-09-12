const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
	try {
		const { item } = await Cache(
			'https://lucid-dijkstra-0e5a96.netlify.app/.netlify/functions/skateboards',
			{
				duration: '6h',
				type: 'json'
			}
		);

		console.log('item', item);

		return item;
	} catch (error) {
		return `There is an error b: ${error}`;
	}
}


// const chromium = require('chrome-aws-lambda');
// module.exports = async () => {

// 	const browser = await chromium.puppeteer.launch({
// 		executablePath: await chromium.executablePath,
// 		args: chromium.args,
// 		defaultViewport: chromium.defaultViewport,
// 		headless: true,
// 	});

// 	const url  = 'https://www.skatewarehouse.com/';
// 	const page =  await browser.newPage();
// 	const date = new Date();
// 	const time = date.getTime();
// 	await page.goto(url);

// 	// const userFeed = await page.waitForNavigation({waitUntil: 'networkidle0'});

// 	let img = await page.screenshot({
// 		encoding: 'binary',
// 		path:     `./src/images/skateboards_${time}.jpg`
// 	});

// 	let dailyDose = await page.evaluate(() => {
// 		const note = document.querySelector('.daily_dose_img ~ .note').textContent;
// 		const dose_price = document.querySelector('.daily_dose_img ~ .price').textContent;
// 		const link = document.querySelector('.daily_dose_img').parentElement.getAttribute('href');

// 		return {
// 			note,
// 			price: dose_price,
// 			link
// 		}
// 	});

// 	await browser.close();

// 	console.log('dailyDose', dailyDose);
// 	return {
// 		img: `skateboards_${time}.jpg`,
// 		daily: dailyDose
// 	};
// }