const chromium = require('chrome-aws-lambda');

const cl = async () => {

	const browser = await chromium.puppeteer.launch({
		executablePath: undefined,
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		headless: true,
	});

	const url  = 'https://baltimore.craigslist.org/d/for-sale/search/sss';
	const page =  await browser.newPage();
	await page.goto(url);

	let item = await page.evaluate(() => {
		const ad = document.querySelectorAll('.result-info')[0].querySelector('a').textContent;

		return ad;
	});

	await browser.close();

	return item;
}

exports.handler = async (event, context) => {
  try {
		const subject = event.queryStringParameters.name || 'World'
		const item = await cl();
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
