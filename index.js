'use strict'

/**TODO
-Make the file input dynamic
-Save output to a .vtt file
-Probably other stuff too
*/
const fs = require('fs')

const VttConvert = require('./lib/vttConvert')
const vttConvert = new VttConvert()


fs.readFile('beemovie.json', 'utf8', (err, file) => {
    if (err) {
        console.log(err);
        return err
    }

    vttConvert.convertFile(file, (err, res) =>
    {
        if (err)
        {
            console.log(err);
            return err
        }
            console.log(res);
            process.exit()
            return res
    })
})
