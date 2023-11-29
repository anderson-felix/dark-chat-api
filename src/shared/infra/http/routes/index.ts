/* eslint-disable no-console */
import { Router } from 'express';
import AdmZip from 'adm-zip';
import axios from 'axios';
import puppeteer from 'puppeteer';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

export default router;

router.get('/crawler/:url', async function (req, res, next) {
  if (!req.params.url) return res.status(400).json({ error: 'Wrong request' });

  const baseUrl = `https://stockx.com/${req.params.url}`;

  let pageContent = {} as any;

  try {
    pageContent = await axios.get(baseUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
    });

    // console.log("pageContent.data: ", pageContent.data);
  } catch (e: any) {
    console.log('error', JSON.stringify(e, null, 4));
    return res.sendStatus(Number(e.status || 500));
  }

  const regex = 'https://images.stockx.com/360/.*/Lv2/img01.jpg';
  const urlArray = [];

  const zip = new AdmZip();

  const new_match = pageContent.data?.match(regex);

  if (!new_match) return res.status(300);

  urlArray.push(new_match[0]);

  for (let i = 2; i <= 36; i++) {
    console.log(i);
    if (i < 10) {
      urlArray.push(new_match[0].replace('img01', `img0${i}`));
    } else {
      urlArray.push(new_match[0].replace('img01', `img${i}`));
    }
  }

  let i = 1;

  for await (const url of urlArray) {
    const downloadedFile = axios.create({ baseURL: url, timeout: 70000 });
    const imageBinary = await downloadedFile.get(url, {
      responseType: 'arraybuffer',
    });

    zip.addFile(`image${i}.jpg`, Buffer.from(imageBinary.data, 'utf8'));
    console.log(url);
    i += 1;

    setTimeout(function () {
      console.log('This printed after about 1 second');
    }, 500);
  }

  const willSendThis = zip.toBuffer();

  return await res
    .writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=360images.zip`,
    })
    .end(Buffer.from(willSendThis));

  return res.status(200);
});

router.get('/puppeteer/:url', async function (req, res, next) {
  if (req.params.url === undefined) return res.status(400).json({ error: 'Wrong request' });

  const baseUrl = `https://stockx.com/${req.params.url}`;
  console.log(' req.params.url: ', req.params.url);

  let pageContent = {} as any;

  try {
    const browser = await puppeteer.launch();

    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');

    await page.goto(baseUrl, { referer: '' });

    const content = await page.content();

    pageContent = { data: content };
    console.log('pageContent: ', pageContent);
  } catch (e: any) {
    console.log('error', JSON.stringify(e, null, 4));
    return res.sendStatus(Number(e.status || 500));
  }

  const regex = 'https://images.stockx.com/360/.*/Lv2/img01.jpg';
  const urlArray = [];

  const zip = new AdmZip();

  const new_match = pageContent.data?.match(regex);

  if (!new_match) return res.status(300);

  urlArray.push(new_match[0]);

  for (let i = 2; i <= 36; i++) {
    console.log(i);
    if (i < 10) {
      urlArray.push(new_match[0].replace('img01', `img0${i}`));
    } else {
      urlArray.push(new_match[0].replace('img01', `img${i}`));
    }
  }

  let i = 1;

  for await (const url of urlArray) {
    const downloadedFile = axios.create({ baseURL: url, timeout: 70000 });
    const imageBinary = await downloadedFile.get(url, {
      responseType: 'arraybuffer',
    });

    zip.addFile(`image${i}.jpg`, Buffer.from(imageBinary.data, 'utf8'));
    console.log(url);
    i += 1;

    setTimeout(function () {
      console.log('This printed after about 1 second');
    }, 500);
  }

  const willSendThis = zip.toBuffer();

  return await res
    .writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=360images.zip`,
    })
    .end(Buffer.from(willSendThis));

  return res.status(200);
});
