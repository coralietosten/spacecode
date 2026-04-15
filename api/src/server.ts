'use strict';
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

import { initDb } from './utilsDb'
import cors from "cors";

const api = require('./routes/routes.ts'); 

// Initialisation de la DB
initDb();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());



app.use('/api', api());

// Lancement du serveur web
var port = 'PORT' in process.env ? process.env.PORT : 8080;
const server = app.listen(port, function () {
    console.log('My app is listening at http://127.0.0.1:%s/api', port);
});