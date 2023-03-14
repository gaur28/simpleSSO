const express = require('express');
const db = require("../database/database");
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const privateKey = 'secretKey'


routes.get('/', function(req,res){
res.render('index')
});

routes.get('/userInfo',  async function(req,res){
   

    const userToken = req.session.user.token;
   
    const userInfo = await db.getDb().collection('user').findOne({token: userToken}, {id:0, name:0, email:0, token:1});
    if(userInfo){
       return res.render('userinfo', {userInfo:userInfo});
    }
    
    res.send({
        message: " you are not Authorized"
    })
}) 

// function verifyToken(req,res,next){
//     // const authHeader = req.session.user.token
//     // console.log(authHeader)
//     // const token =authHeader 
//     const authHeader = req.headers['Authorization'];
//     console.log(authHeader);

//     if(typeof authHeader !==undefined ){
//         const bearer = authHeader.split(" ");
       
//         const token = bearer[1];
//         req.token = token
//         console.log(req.token)
//     }else{
//        res.send({
//         result: 'token not valid'
//        })
//     }
    
//     next()

    

       
//     ;
// }



module.exports = routes;