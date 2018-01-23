'use strict'

const Helpers = require('./helpers')
const helpers = new Helpers()
const fs = require('fs')
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

module.exports =
class VttConvert
{

    constructor()
    {

    }

    convertFile(params, callback)
    {

        const self = this

        // console.log('convertFile');

        // self._privateFunction({foo: 'bar'}, (err, res) =>
        // {
        //
        //     self._privateFunctionWithHelper('more data', (err, res) =>
        //     {
        //         return callback(null, res)
        //     })
        // })

        //do your main stuff here

        var json;
        var vtt = 'WEBVTT\n\n';
        fs.readFile('beemovie.json', 'utf8', (err, data) => {
            if (err) throw err;
            json = JSON.parse(data);

            var current_start = json.results.items[0].start_time;
            var formatted_start;
            var formatted_end;
            var nextline = '';
            var reset = false;

            json.results.items.forEach(function(item, index) {
                if (reset == true && item.type != 'punctuation') {
                    current_start = item.start_time;
                    reset = false;
                }
                if ((item.end_time - current_start > 5 && item.type == 'pronunciation')) {
                    helpers.secondsToMinutes(current_start, (err, res) => {formatted_start = res;});
                    helpers.secondsToMinutes(item.end_time, (err, res) => {formatted_end = res;});
                    vtt += formatted_start + ' --> ' + formatted_end + '\n';
                    vtt += nextline + '\n\n';
                    nextline = item.alternatives[0].content + ' ';
                    reset = true;
                } else {
                    if (item.type == 'punctuation') {
                        nextline = nextline.slice(0, -1); //Remove the space before pucntuation
                    }
                    nextline += item.alternatives[0].content + ' ';
                }

            })
            vtt = vtt.slice(0,-2); //Remove the 2 extra newlines at the end
            vtt += nextline; //Add any leftover words to the end
            process.exit();
        });
    }

    // _privateFunction(params, callback)
    // {
    //
    //     const self = this
    //
    //     console.log('_privateFunction');
    //
    //     return callback(null, 'private function')
    // }
    //
    // _privateFunctionWithHelper(params, callback)
    // {
    //     const self = this
    //
    //     console.log('_privateFunctionWithHelper');
    //
    //     helpers.secondsToMinutes(params, (err, res) =>
    //     {
    //
    //         return callback(null, res)
    //     })
    // }

}
