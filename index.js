const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const routes = require('./routes');

const app = express();
const port = 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended : false,
    })
);
app.use('/assets', express.static(__dirname + '/public/'));

// app routes
app.use('/', routes);

// catching 404 error
app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port , () => {
    console.log(`App running on port ${port}`)
});

