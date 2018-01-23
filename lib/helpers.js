'use strict'

module.exports =
class Helpers
{
    constructor()
    {

    }

    secondsToMinutes(seconds, callback)
    {
        var hours = 0;
        var minutes = 0;
        // console.log('input: ' + seconds);
        hours = Math.floor(seconds / 3600);
        seconds = seconds - (hours * 3600);
        minutes = Math.floor(seconds / 60);
        seconds = (seconds - (minutes * 60)).toFixed(0);

        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }
        // console.log('formatted time: ' + hours + ':' + minutes + ':' + seconds);

        var response = str_pad_left(hours,'0',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        // console.log('response: ' + response + '\n');
        return callback(null, response)
    }
}
