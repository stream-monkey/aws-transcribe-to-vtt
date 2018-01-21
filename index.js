'use strict'

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
