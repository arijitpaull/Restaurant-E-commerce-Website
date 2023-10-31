var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"food_website"
});



var app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(session({secret:"secret"}));

app.listen(8080);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){

    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"food_website"
    });

    con.query("SELECT * FROM products",(err,result)=>{
        res.render('pages/index',{result:result});
    });

    
});

app.get('/menu',function(req,res){
    const currentCategory = document.querySelectorAll(".filters_menu li.active")[0];
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"food_website"
    });

    con.query("SELECT * FROM products",(err,result)=>{
        res.render('pages/menu',{result:result});
    });
});

app.get('/about',function(req,res){
    res.render('pages/about');
});

app.get('/book',function(req,res){
    res.render('pages/book');
});

