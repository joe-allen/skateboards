const chromium = require('chrome-aws-lambda');

const skate = async () => {

	const browser = await chromium.puppeteer.launch({
		// executablePath: undefined,
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

	let dailyDose = await page.evaluate(() => {
		const note = document.querySelector('.daily_dose_img ~ .note').textContent;
		const dose_price = document.querySelector('.daily_dose_img ~ .price').textContent;
		const link = document.querySelector('.daily_dose_img').parentElement.getAttribute('href');

		return {
			note,
			price: dose_price,
			link
		}
	});

	await browser.close();

	return {
		daily: dailyDose
	};

	// LOOK INTO IMG HOSTING
	// TO SEND IMAGE TO
	// let img = await page.screenshot({
	// 	encoding: 'binary',
	// 	path:     `./src/images/skateboards_${time}.jpg`
	// });
	// return {
	// 	img: `skateboards_${time}.jpg`,
	// 	daily: dailyDose
	// };
}

exports.handler = async (event, context) => {
  try {
		const subject = event.queryStringParameters.name || 'World'
		const item = await skate();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}`, item }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
