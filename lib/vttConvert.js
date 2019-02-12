'use strict'


function strPadLeft (string, length, pad) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}


// vtt conversion code taken from https://www.npmjs.com/package/aws-transcribe-to-vtt
function secondsToMinutes (seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds = seconds - (hours * 3600);
    const minutes = Math.floor(seconds / 60);
    seconds = (seconds - (minutes * 60)).toFixed(3);
    return strPadLeft(hours, 2, '0') + ':' + strPadLeft(minutes, 2, '0') + ':' + strPadLeft(seconds, 6, '0');
}


module.exports = function convertJsonToVtt (file) {
    let vtt = 'WEBVTT\n\n';

    const json = JSON.parse(file);

    let current_start = json.results.items[0].start_time;
    let formatted_start;
    let formatted_end;
    let nextline = '';
    let reset = false;

    json.results.items.forEach(function (item, index) {
        if (item.type == 'punctuation') {
            nextline = nextline.slice(0, -1); // remove the space before pucntuation
            nextline += item.alternatives[0].content;
            formatted_start = secondsToMinutes(current_start);
            formatted_end = secondsToMinutes(json.results.items[index - 1].end_time);
            vtt += formatted_start + ' --> ' + formatted_end + '\n';
            vtt += nextline + '\n\n';
            nextline = '';
            // in case of current element is the last one
            if (index < (json.results.items.length - 1)) {
                current_start = json.results.items[index + 1].start_time;
            }
        } else if (item.end_time - current_start > 5) {
            formatted_start = secondsToMinutes(current_start);
            formatted_end = secondsToMinutes(json.results.items[index - 1].end_time);
            vtt += formatted_start + ' --> ' + formatted_end + '\n';
            vtt += nextline + '\n\n';
            nextline = item.alternatives[0].content + ' ';
            current_start = item.start_time;
        } else {
            nextline += item.alternatives[0].content + ' ';
        }

    })

    formatted_start = secondsToMinutes(current_start);
    if (json.results.items[json.results.items.length - 1].type != 'punctuation') {
        formatted_end = secondsToMinutes(json.results.items[json.results.items.length - 1].end_time);
    } else {
        formatted_end = secondsToMinutes(json.results.items[json.results.items.length - 2].end_time);
    }

    vtt += formatted_start + ' --> ' + formatted_end + '\n';
    vtt += nextline; // add any leftover words to the end

    return vtt;
};
