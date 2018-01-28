'use strict'

/**TODO
-Make the file input dynamic
-Make file output _name_ dynamic
-Probably other stuff too
*/
const fs = require('fs')
const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver'),
    firefox = require('selenium-webdriver/firefox');
const async = require('async');

const VttConvert = require('./lib/vttConvert')
const vttConvert = new VttConvert()


fs.readFile('beemovie.json', 'utf8', (err, file) => {
    if (err) {
        console.log(err);
        return err
    }

    const {Builder, By, Key, until} = require('selenium-webdriver');

    (async function startPage() {
        let driver = await new Builder().forBrowser('firefox').build();
        try {
            console.log('opening test page...\n');
            await driver.get('file:///repos/aws-transcribe-to-vtt/index.html');
        } finally {
        // await driver.quit();
            process.exit()
        }
    })();

    vttConvert.convertFile(file, (err, res) =>
    {
        if (err)
        {
            console.log(err);
            return err
        }
        fs.writeFile('output/beemovie.vtt', res, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        return res
    })
})
