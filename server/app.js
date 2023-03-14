const url = require('url');

const path = require('path')

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const db = require('./database/database');

const routes = require('./routes/route');



const MongodbStore = MongoDBStore(session);
const sessionStore = new MongodbStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'jwt',
    collection: 'session'
});


const app = express();



app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '23456789iamasecret987654321loook',
    resave:false,
    saveUninitialized: false,
    store:sessionStore,
    cookie: {
        maxAge:30*24*60*60*1000 ,
        sameSite: 'lax',
    }
    }));

    app.use(function(req,res,next){
        const isAuthanticated = req.session.isAuthanticated;

        res.locals.isAuth = isAuthanticated;

        next()
    })


    app.use(routes)


   


    
db.connectToDatabase().then(function(){
    app.listen(3000);
})
