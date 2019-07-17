const request = require('request');
forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3486aec88b2021c3a5808700e832d705/' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) callback('Unable to connect to api.Please check your internet connection', undefined);
        else if (body.error)
            callback('Invalid Location!')
        else
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.daily.summary,
                timezone: body.timezone


            })
    })
}

module.exports = forecast
