'use strict'

/**TODO
-Make the file input dynamic
-Save output to a .vtt file
-Probably other stuff too
*/

const VttConvert = require('./lib/vttConvert')
const vttConvert = new VttConvert()


function runJob(params, callback)
{
    vttConvert.convertFile('file', (err, res) =>
    {
        if (err)
        {
            return callback(err)
        }

            return callback(null, res)
    })

}

runJob('pathtofile', (err, res) =>
    {
        if (err)
        {
            return err
        }

            return res
    })
