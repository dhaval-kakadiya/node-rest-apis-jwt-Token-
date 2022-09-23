require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path =require('path')


// <<<<<<<<<<<< DB >>>>>>>
require('./config/db');


app.use(express.json({limit:1000000000}));
app.use(express.urlencoded({extended:false,limit : 1000000000}));


// <<<<<<<<<<<<<<< SWAGGER >>>>>>>>>>>>>>>>>
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// <<<<<<< REQIRED FOLDER / FILE >>>>>>>>>
const router = require('./routes/index')
const adminSeed = require('./seeder/seed');


// <<<<<<<<<< ACCESS STATIC PAGE >>>>>>>>>>
app.use(express.static(path.join(__dirname,'public')))

app.use('/api',router);


adminSeed();

app.listen(port,()=> {
    console.log(`Server Listening On Port ${port}`);
})