var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'aa9245.ckawof3c6hyn.us-east-1.rds.amazonaws.com',
  user     : 'aa9245',
  password : 'yums6529',
  database : 'univ7calab'
});

conn.connect();


app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false}))
app.engine('html', require('ejs').renderFile);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.html');
})






app.post('/apply_list', function(req, res) {
    var name = req.body.name;
    var grade = req.body.grade;
    var gender = req.body.gender;
    var leader = req.body.leader;
    var phone = req.body.phone;
    var date = new Date();
    var category = req.body.category;

    //13일
    var lun13 = req.body.lun13;
    var din13 = req.body.din13;
    var slp13 = req.body.slp13;
    //14일
    var mor14 = req.body.mor14;
    var lun14 = req.body.lun14;
    var din14 = req.body.din14;
    var slp14 = req.body.slp14;
    //15일
    var mor15 = req.body.mor15;
    var lun15 = req.body.lun15;
    var din15 = req.body.din15;
    var slp15 = req.body.slp15;
    //16일
    var mor16 = req.body.mor16;
    var lun16 = req.body.lun16;

    var sql = 'INSERT INTO calab (name, grade, gender, leader, phone, date, category, lun13, din13, slp13, mor14, lun14, din14, slp14, mor15, lun15, din15, slp15, mor16, lun16) VALUES(?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)';
    conn.query(sql, [name, grade, gender, leader, phone, date, category, lun13, din13, slp13, mor14, lun14, din14, slp14, mor15, lun15, din15, slp15, mor16, lun16], function(err, rows, fields) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/check');
        }
    })
})

app.get('/goto', function(req, res) {
    var sql = 'SELECT *FROM calab'
    conn.query(sql, function(err, topic, fields) {
        if(err) {
            console.log(err);
        } else {
            res.render('goto', {topic: topic});
        }
    })
})

app.get('/check', function(req, res) {
    res.send('제출하였습니다!');
})

app.listen(3000, function() {
    console.log('connected 3000 port!')
})
