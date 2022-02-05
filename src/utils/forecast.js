const request = require('request');

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6adcd5473ab6126561db84d0ba36fcf5&query=' + latitude + ',' + longitude + '&units=f';

    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + ' degree')
        }
    })
}

module.exports = forecast;