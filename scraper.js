const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const fs = require('fs');

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.dakboard.com/app?p=4b132e470c83c0740c257f9d994b773e');
    await page.waitForTimeout(4000);

    const response = await page.content();
    const image = getImage(response);

    if (image) {
      fs.readFile('./public/images.txt', function(err, data) {
        if (err) throw err;
        if (!data.includes(image)) {
          fs.appendFile('./public/images.txt', `${image}\n`, function(err) {
            if (err) throw err;
            console.log('saved!');
            setTimeout(scrape, 1000);
          });
        } else {
          console.log('duplicate!');
          setTimeout(scrape, 1000);
        }
      });
    }
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    await browser.close();
    setTimeout(scrape, 1000);
  }
};

const getImage = html => {
  const $ = cheerio.load(html);
  const underlay = $('#background-underlay-2').css('background');
  return underlay.split('"')[1].split('"')[0];
};

scrape();
