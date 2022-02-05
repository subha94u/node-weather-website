//nodemon src/app.js
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// const { AsyncResource } = require('async_hooks');
console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const app = express();

// Define paths for Express config
// Here is the directory which is setup will be exposed by the web server
const publicDirectoryPath = path.join(__dirname, '../public');
// Customize the template path by default view folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//For templating
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


//
// Dynamic template 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Subhabrata'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Subhabrata'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Subhabrata',
        message: 'This is a society help from my side'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    //**** */ Callback Chaining => calling a callback iside another callback
    geocode(req.query.address, (error, {latitude = '', longitude = '', location = ''} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
    /*
    res.send({
        forecast: '50 degrees',
        location: 'New York',
        address: req.query.address
    });*/
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [{

        }]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Subhabrata',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Subhabrata',
        message: 'Page not found'
    })
})

//========
//app.use(express.static(publicDirectoryPath + '/about.html'))
//app.use(express.static(publicDirectoryPath + '/help.html'))
/*
app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
})*/
/*
app.get('/help1', (req, res) => {
    res.send([{
        name: 'Subha1',
        age: 40
    },
    {
        name: 'Subha2',
        age: 40
    }
]);
})

app.get('/about1', (req, res) => {
    res.send('<h2>About Express!</h2>');
})*/
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up in port 3000');
});


