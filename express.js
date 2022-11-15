const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

var sessionHandler;

const app = express()

app.use(bodyParser.json())

const PORT = 3000

var users = [
  {
    username: 'Anton',
    email: 'anton2@gmail.com',
    password: '123456'
  },
  {
    username: 'Sergey',
    email: 'sergey@gmail.com',
    password: 'bjhei23'
  },
  {
    username: 'Sasha',
    email: 'alexandra@mail.ru',
    password: 'JweM22_eE4'
  },

]

//var sessionHandler = require('./public/js/authorization.js')

const urlencodedParser = express.urlencoded({extended: false});

app.use(cookieParser());

app.use(session({
 // store: store,
  username: undefined,
  password: undefined,
  resave:  false,
  saveUninitialized: true,
  secret: "supersecret",
    
}))

var sqlite3 = require('sqlite3').verbose()
let sql;
const db = new sqlite3.Database('./data.db')
//sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, username, email, password)`;
// sql = `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`
// db.run(
//     sql,
//     ["Sergey", "sergey@gmail.com", "bjhei23"], 
//     (err) => {
//     if (err) return console.error(err.message);
// });
// sql = `SELECT * FROM users`
// db.all(sql, [], (err, rows) => {
//     if (err) return console.error(err.message);
//     rows.forEach((row) => {
//         console.log(row)
//     })
// })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/course', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('course')
})

app.get('/sandbox', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('code-editor')
})

app.get('/user', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('user', {username: req.session.username})
})


app.post('/register', urlencodedParser, function(req, res) {
     var foundUser;
     // поиск пользователся в базе данных;
     if(req.session.username !== undefined && !req.session.password !== undefined)
     {
        
     }
     for(var i = 0; i<users.length; i++)
     {
      var u = users[i]
      if(u.username == req.body.username && u.password == req.body.password)
        {
          foundUser = u.username
          req.session.username = u.username
          req.session.password = u.password
          break
        }
     }
     
     // если ли логин пользователя в системе
     if(foundUser !== undefined)
     {
       // req.session.username = foundUser
        res.send(`Зашел пользователь ${req.body.username} с паролем ${req.body.password}`)
     }
     else
     {
        console.log("Login failed ", req.body.username)
        res.status(401).send('Login error')
     }
})

app.listen(PORT, () => {

    console.log(`Server started at: http://localhost:${PORT}`)
})