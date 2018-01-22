'use strict'

const Helpers = require('./helpers')
const helpers = new Helpers()

module.exports =
class VttConvert
{

    constructor()
    {

    }

    convertFile(params, callback)
    {

        const self = this

        console.log('convertFile');

        self._privateFunction({foo: 'bar'}, (err, res) =>
        {

            self._privateFunctionWithHelper('more data', (err, res) =>
            {
                return callback(null, res)
            })
        })
        //do your main stuff here

    }

    _privateFunction(params, callback)
    {

        const self = this

        console.log('_privateFunction');

        return callback(null, 'private function')
    }

    _privateFunctionWithHelper(params, callback)
    {
        const self = this

        console.log('_privateFunctionWithHelper');

        helpers.secondsToMinutes(params, (err, res) =>
        {

            return callback(null, res)
        })
    }

}
