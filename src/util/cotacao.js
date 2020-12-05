const request = require('request');

const api_token = "ef4bc145bd6a7859eed625f7e032ef03";

const cotacao = (symbol, callback) => {
    
    const url = `http://api.marketstack.com/v1/eod?symbols=${symbol}&access_key=${api_token}`;
    request({url: url, json: true}, (err, response) => {

        if(err) {
            return callback({
                message: `Something went wrong: ${err}`,
                code: 500
            }, undefined);
        }
        
        if(response.body === undefined || response.body.data === undefined) {
            return callback({
                message: `No data found`,
                code: 404
            }, undefined);
        }

        const parsedJSON = response.body.data[0];
        
        const { symbol, open } = parsedJSON

        callback(undefined, {symbol, open});
    })
}


module.exports = cotacao