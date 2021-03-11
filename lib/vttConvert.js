'use strict'

const Helpers = require('./helpers')
const helpers = new Helpers()
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
const async = require('async')

module.exports =
class VttConvert
{

    constructor()
    {

    }

    convertFile(file, callback)
    {

        const self = this

        var vtt = 'WEBVTT\n\n';

        var json = JSON.parse(file);

        var current_start = json.results.items[0].start_time;
        var formatted_start;
        var formatted_end;
        var nextline = '';
        var reset = false;

        async.eachOf(json.results.items, function(item, index) {
            if (item.type == 'punctuation') {
                nextline = nextline.slice(0, -1); //Remove the space before pucntuation
                nextline += item.alternatives[0].content;
                helpers.secondsToMinutes(current_start, (err, res) => {formatted_start = res;});
                helpers.secondsToMinutes(json.results.items[index - 1].end_time, (err, res) => {formatted_end = res;});
                vtt += formatted_start + ' --> ' + formatted_end + '\n';
                vtt += nextline + '\n\n';
                nextline = '';
                // in case od current element is the last one
                if (index < (json.results.items.length - 1)) {
                    current_start = json.results.items[index + 1].start_time;
                }
            } else if (item.end_time - current_start > 5) {
                helpers.secondsToMinutes(current_start, (err, res) => {formatted_start = res;});
                if (index !== 0) {
                    helpers.secondsToMinutes(json.results.items[index - 1].end_time, (err, res) => {formatted_end = res;});
                } else {
                    helpers.secondsToMinutes(json.results.items[index].end_time, (err, res) => {formatted_end = res;});
                }
                vtt += formatted_start + ' --> ' + formatted_end + '\n';
                vtt += nextline + '\n\n';
                nextline = item.alternatives[0].content + ' ';
                current_start = item.start_time;;
            } else {
                nextline += item.alternatives[0].content + ' ';
            }

        })

        helpers.secondsToMinutes(current_start, (err, res) => {formatted_start = res;});
        if (json.results.items[json.results.items.length - 1].type != 'punctuation') {
            helpers.secondsToMinutes(json.results.items[json.results.items.length - 1].end_time, (err, res) => {formatted_end = res;});
        } else {
            helpers.secondsToMinutes(json.results.items[json.results.items.length - 2].end_time, (err, res) => {formatted_end = res;});
        }

        vtt += formatted_start + ' --> ' + formatted_end + '\n';
        vtt += nextline; //Add any leftover words to the end

        callback(null, vtt)
    }

}
