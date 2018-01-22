'use strict'

module.exports =
class Helpers
{
    constructor()
    {

    }

    secondsToMinutes(seconds, callback)
    {
        var hours = Math.floor(seconds / 3600);
        seconds = seconds - (hours * 3600);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);

        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }

        var response = str_pad_left(hours,'0',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        return callback(null, response)
    }
}
