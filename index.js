'use strict';

/**TODO
-Break into node index.js and node test functions so it doesn't load the player every time.
*/

const fs         = require('fs');
const vttConvert = require('./lib/vttConvert');
const express    = require('express');
const prompt     = require('prompt-sync')();


const app = express();

app.use(express.static('output'));

const path = prompt('What is the path to the json file from AWS? ');

const file = fs.readFileSync(path, 'utf8');
const vtt = vttConvert(file);
fs.writeFileSync('output/output.vtt', vtt);
console.log('The file has been saved!');
