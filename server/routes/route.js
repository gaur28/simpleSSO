const express = require('express');
const db = require("../database/database");
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const privateKey = 'secretKey'

routes.get('/',function(req,res){
res.render('index')
})
routes.get('/login', function(req,res,next){
res.render('login');
});

routes.post('/login', async function(req,res,next){
const UserInfo = {
    name: req.body.username || 'tushar Gaur',
    email: req.body.email || 'gaurtushar@gamil.com',
}
const token =  jwt.sign({UserInfo}, privateKey, {expiresIn: '600s'})

const user = {
    name: UserInfo.name,
    email: UserInfo.email,
    token: token
}

const userInfo = await db.getDb().collection('user').insertOne(user);
req.session.user = {
    email: user.email,
    token:token
};
const headerToken = "bearer" +" "+ token;
console.log(headerToken)
req.session.isAuthanticated = true;
res.setHeader("Authorization", headerToken);
req.session.save(function(){
   res.redirect(`http://localhost:8000/`)
})
});

routes.get('/logout', function(req,res){
    req.session.user = null;
    req.session.isAuthanticated = false;
    res.redirect(`http://localhost:8000/`)
})




module.exports = routes;