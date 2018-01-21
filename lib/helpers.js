'use strict'

module.exports =
class Helpers
{
    constructor()
    {

    }

    helperJob1(params, callback)
    {
        console.log('helperJob1');
        return callback(null, 'response')
    }
}
