'use strict';
const express = require('express');
const app = express();

const api = require('./routes/routes.ts'); 

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api', api());

// Lancement du serveur web
var port = 'PORT' in process.env ? process.env.PORT : 8080;
const server = app.listen(port, function () {
    console.log('My app is listening at http://127.0.0.1:%s', port);
});