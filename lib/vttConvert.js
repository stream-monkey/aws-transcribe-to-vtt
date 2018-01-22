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

            json.results.items.forEach(function(item, index) {
                if (item.end_time - current_start < 5) {
                    nextline+= item.alternatives[0].content + ' ';
                } else {
                    helpers.secondsToMinutes(current_start, (err, res) => {formatted_start = res;});
                    helpers.secondsToMinutes(item.end_time, (err, res) => {formatted_end = res;});
                    console.log('new formatted end time: It goes from ' + current_start + ' to ' + item.end_time);
                    vtt += formatted_start + ' --> ' + formatted_end + '\n';
                    vtt += nextline + '\n\n';
                    var nextline = '';
                    current_start = json.results.items[index + 1].start_time;
                }

            })
            // console.log(vtt);
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
