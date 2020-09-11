const chromium = require('chrome-aws-lambda');

async function skateboard() {
	const browser = await chromium.puppeteer.launch({
		executablePath: await chromium.executablePath,
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		headless: false,
	});

	const url  = 'https://www.skatewarehouse.com/';
	const page =  await browser.newPage();

	await page.goto(url);
	await page.screenshot({path: 'skateboards.jpg'})

	await browser.close();
}


exports.handler = async (event, context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
