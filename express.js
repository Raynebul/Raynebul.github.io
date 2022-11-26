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

var object = {

};

const datacourse = require('./courses.json')
const datasandbox = require('./projects.json')

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

//GET
app.get('/', (req, res) => {
  console.log(req.headers['cookie'])
  res.render('mainpage')
})

//GET
app.get('/course', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('course')
})

//GET
app.get('/course/:name/:page', (req, res) => {
  console.log(req.headers['cookie'])
  //Перед этим мы находим название и id курса и его страницу
  //res.json(daracourses)
  res.render('course')
})

app.put('/course/:name/:page', (req, res) => {
  //при выполнении задания и его проверки, параметр pag_completed 
  //и/или course_comlpeted с false на true 
})

//GET
app.get('/sandbox', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('code-editor', {username: req.session.username})
})

app.get('/sandbox/:projectname', (req, res) => {
  console.log(req.headers['cookie'])
  //Перед этим мы находим название и id проекта из json-файла dataprojects
  //res.json(daraprojects)
  res.render('code-editor', {username: req.session.username})
})

app.post('/sandbox', (req, res) => {
   //  datacourse.courses.push() - здесь будет создаваться новый проект юзера
})

app.delete('/sandbox/:projectname', (req, res) => {
  // здесь будет удаляться проект, созданный юзером.
})

app.put('/sandbox/:projectname', (req, res) => {
  // обновление проекта
})


//Get
app.get('/user', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('user', {username: req.session.username})
})

//Get
app.get('/user/:username', (req, res) => {
  console.log(req.headers['cookie'])
  res.render('user', {username: req.session.username})
})

//Post
app.post('/user', urlencodedParser, function(req, res) {
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
       // res.send(`Зашел пользователь ${req.body.username} с паролем ${req.body.password}`)
       res.render('user', {username: req.session.username})
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