const request = require('request');
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFyb25iYXNpdCIsImEiOiJjankwbHlvcnUwMzYwM25vaGtucDd3ZWRjIn0.TTAMH-iStegSIiQwECd8UA&limt=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) callback('Unable to connect to Weather api. Please check your internet connection', undefined);
        else if (body.features.length === 0)
            callback('Invalid location entered', undefined);
        else
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            })
    })
};
module.exports = geoCode