const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://www.artofskateboarding.com/aos_main.asp')
  await page.waitForSelector('.viewlet_spotlight img');

  const element = await page.$('.viewlet_spotlight img');
  await element.screenshot({path: 'oas.jpg'});
  await browser.close();

  // const res = Cache('')
})();
