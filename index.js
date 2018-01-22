'use strict'

/**TODO
-Make the file input dynamic
-fix the webvtt output so it actually outputs words correctly
-fix the time formatting
-Add a check for pronunciation (since it doesn't have start or end time)
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
