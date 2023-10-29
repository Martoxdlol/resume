import puppeteer from 'puppeteer'
import path from 'path'
import express from 'express'

const browser = await puppeteer.launch({ headless: "new" });

const page = await browser.newPage();

const distPath = path.resolve('./dist');

async function main() {

    const app = express();

    app.use('/resume', express.static(distPath));

    app.listen(9898);

    await page.goto('http://127.0.0.1:9898/resume', { waitUntil: 'networkidle0' });

    await page.emulateMediaType('print');

    await page.pdf({
        path: path.resolve('./dist/resume.pdf'),
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        printBackground: true,
        scale: 0.95,
        format: 'A4',
    });

    process.exit()
}

main()