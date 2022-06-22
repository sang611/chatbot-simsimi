const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const route = require('./routes/route');
const dotenv = require('dotenv');

dotenv.config();
let port = process.env.PORT || 3001;

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

route(app);

console.log('RESTful API server started on: ' + port);
