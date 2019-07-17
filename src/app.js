const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode');
//paths for express 

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../sitePages/views');
const partialPath = path.join(__dirname, '../sitePages/partials');

//Setup handlebars and views location 

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);


//static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact-us', (req, res) => {
    res.render('contact-us');
})

app.get('/weather', (req, res) => {

    if (!req.query.address)
        return res.send({
            error: 'You must provide an address'
        })
    geoCode(req.query.address, (error, locationData) => {
        if (error)
            return res.send({ error: 'Error! provide valid location' })
        forecast(locationData.latitude, locationData.longitude, (error, data) => {
            if (error) return res.send({ error: 'Error!' })
            res.send({
                temperature: data.temperature,
                summary: data.summary,
                timezone: data.timezone,
                location: locationData.placeName
            })
        })
    })
})

//404 page

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(8080, () => {
    console.log('Server is running!');
})