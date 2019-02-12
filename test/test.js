'use strict'

/**TODO
-Break into node index.js and node test functions so it doesn't load the player every time.
*/

const fs = require('fs')
const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver'),
    firefox = require('selenium-webdriver/firefox');
const async = require('async');
const vttConvert = require('../lib/vttConvert')
const express = require('express')
const app = express()
const prompt = require('prompt-sync')();

app.use(express.static('output'))
app.listen(3000)

var path = prompt('What is the path to the json file from AWS? ');
var m3u8_url = prompt('What is the URL to your M3U8 to test? ');

fs.readFile('output/sample.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/replace me/g, m3u8_url);

  fs.writeFile('output/index.html', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});

fs.readFile(path, 'utf8', (err, file) => {
    if (err) {
        console.log(err);
        return err
    }

    const {Builder, By, Key, until} = require('selenium-webdriver');

    (async function startPage() {
        let driver = await new Builder().forBrowser('firefox').build();
        try {
            console.log('Opening test page at http://localhost:3000 \n');
            await driver.get('http://localhost:3000');
        } finally {
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
        fs.writeFile('output/output.vtt', res, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        return res
    })
})
