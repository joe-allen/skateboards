const chromium = require('chrome-aws-lambda');

module.exports = async () => {

	const browser = await chromium.puppeteer.launch({
		executablePath: await chromium.executablePath,
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		headless: true,
	});

	const url  = 'https://www.skatewarehouse.com/';
	const page =  await browser.newPage();
	const date = new Date();
	const time = date.getTime();
	await page.goto(url);
	let img = await page.screenshot({
		encoding: 'binary',
		path:     `./src/images/skateboards_${time}.jpg`
	});
	await browser.close();

	console.log('JOE', `skateboards_${time}.jpg`);
	return `skateboards_${time}.jpg`;
}