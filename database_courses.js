var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "courses.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
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
    }
});


module.exports = db