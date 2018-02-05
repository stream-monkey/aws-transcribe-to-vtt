'use strict'

/**TODO
-Break into node index.js and node test functions so it doesn't load the player every time.
*/

const fs = require('fs')
const async = require('async');
const VttConvert = require('./lib/vttConvert')
const vttConvert = new VttConvert()
const express = require('express')
const app = express()
const prompt = require('prompt-sync')();

app.use(express.static('output'))

var path = prompt('What is the path to the json file from AWS? ');

fs.readFile(path, 'utf8', (err, file) => {
    if (err) {
        console.log(err);
        return err
    }

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
            process.exit();
        });
        return res
    })
})
