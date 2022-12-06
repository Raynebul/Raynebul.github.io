var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "database.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author text,
            projectname text, 
            projectDescription text, 
            autosave integer,
            private integer 
            )`, (err) => {
            if (err) {
                // Table already created
                console.log("no Created table projects")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO projects (author, projectname, projectDescription, autosave, private) VALUES (?,?,?,?,?)'
                db.run(insert, ["Anton","FirstProject", "Some text", 0, 0])
                db.run(insert, ["Sergey","SecondProject","Some text", 0, 0])
                db.run(insert, ["Anton","ThirdProject", "Some text", 0, 0])
                console.log("Created projects table")
            }
        });
        db.run(`CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coursename text,
            courseDescription text, 
            pageNumbers integer
            )`, (err) => {
            if (err) {
                // Table already created
                console.log("no Created table courses")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO courses (coursename, courseDescription, pageNumbers) VALUES (?,?,?)'
                db.run(insert, ["SQL основы", "Текст какой-то", 4])
                db.run(insert, ["SQL экспертиза", "Текст какой-то", 3])
                console.log("Created projects table")
            }
        }); 
        db.run(`CREATE TABLE course_id_1 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskName text,
            taskDescription text
            )`, (err) => {
            if (err) {
                // Table already created
                console.log("no Created table courses")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO course_id_1 (taskName, taskDescription) VALUES (?,?)'
                db.run(insert, ["Введение в запросы", "course_id_1_1"])
                db.run(insert, ["Основы запросов", "course_id_1_1"])
                db.run(insert, ["Select", "course_id_1_1"])
                db.run(insert, ["Where", "course_id_1_1"])
                console.log("Created projects table")
            }
        }); 

        db.run(`CREATE TABLE course_id_2 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskName text,
            taskDescription text
            )`, (err) => {
            if (err) {
                // Table already created
                console.log("no Created table courses")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO course_id_2 (taskName, taskDescription) VALUES (?,?)'
                db.run(insert, ["Введение в создание таблицы", "course_id_1_1"])
                db.run(insert, ["Основы создание таблицы", "course_id_1_1"])
                db.run(insert, ["CREATE TABLE", "course_id_1_1"])
                console.log("Created projects table")
            }
        }); 
        
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE,
            email text, 
            password text
            )`, (err) => {
            if (err) {
                // Table already created
                console.log("no Created table courses")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO users (username, email, password) VALUES (?,?,?)'
                db.run(insert, ["Anton", "anton2@gmail.com", "123456"])
                db.run(insert, ["Sergey", "sergey@gmail.com", "bjhei23"])
                db.run(insert, ["Sasha", "alexandra@mail.ru", "JweM22_eE4"])
                console.log("Created users table")
            }
        });    
    }
});


module.exports = db