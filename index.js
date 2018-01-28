'use strict'

/**TODO
-Make the file input dynamic
-Make file output _name_ dynamic, or just decide to leave it as output.vtt
-Probably other stuff too
*/

const fs = require('fs')
const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver'),
    firefox = require('selenium-webdriver/firefox');
const async = require('async');
const VttConvert = require('./lib/vttConvert')
const vttConvert = new VttConvert()
const express = require('express')
const app = express()
const prompt = require('prompt-sync')();

app.use(express.static('output'))
app.listen(3000)

var path = prompt('What is the path to the json file from AWS? ');

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
