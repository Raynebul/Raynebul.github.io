const express = require('express')

const app = express()

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

app.get('/user/:username', (req, res) => {
    console.log(req.headers['cookie'])
    res.render('user', {username: req.params.username})
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server started at: http://localhost:${PORT}`)
})