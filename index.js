'use strict'

/**TODO
-Make the file input dynamic
-Make file output _name_ dynamic
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
        fs.writeFile('output/beemovie.vtt', res, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            process.exit()
        });
        return res
    })
})
