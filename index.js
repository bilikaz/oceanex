const axios = require('axios')
const http = require('http')
const https = require('https')
const debug = require('debug')('bot')


class Bot {

    call(market, side, volume, price) {
        let config = {
            url: 'orders',
            method: 'post',
            baseURL: 'https://engine.oceanex.cc/api/v2/',
            headers: {
                'Authorization': 'Bearer xxxxxx',
                'Accept-Encoding': 'deflate, gzip;q=1.0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0',
                'Content-Type': 'application/json'
            },
            params: {
                'market':market,
                'volume':volume,
                'price':price,
                'side': side
            },
            httpAgent: new http.Agent({family: 4}),
            httpsAgent: new https.Agent({family: 4}),
        }
        axios(config).then(function(response) {
            debug(response.data)
        }).catch(function(error) {
            debug(error)
        })
    }
}

let bot = new Bot();
for (let i = 0; i < 50; i++) {
    bot.call('vetbtc', 'sell', 1000, 0.00000156)
    bot.call('vetbtc', 'buy', 1000, 0.00000166)
}
