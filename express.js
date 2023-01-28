const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const methodOverride = require("method-override");
var db1 = require("./database_projects.js");
const { text } = require("express");

//var db2 = require("./database_courses.js")

console.log(db1);

var sessionHandler;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;
let i = 2;

var users = [
  {
    username: "Anton",
    email: "anton2@gmail.com",
    password: "123456",
  },
  {
    username: "Sergey",
    email: "sergey@gmail.com",
    password: "bjhei23",
  },
  {
    username: "Sasha",
    email: "alexandra@mail.ru",
    password: "JweM22_eE4",
  },
];

var object = {};

//const datacourse = require('./courses.json')
//const datasandbox = require('./projects.json')
//var sessionHandler = require('./public/js/authorization.js')

//let jsonbase = fs.readFileSync('./public/jsons/projectdata.json');
//let db = JSON.parse(jsonbase)

const urlencodedParser = express.urlencoded({ extended: false });

app.use(cookieParser());

app.use(
  session({
    // store: store,
    username: undefined,
    password: undefined,
    email: undefined,
    resave: false,
    saveUninitialized: true,
    secret: "supersecret",
  })
);

var sqlite3 = require("sqlite3").verbose();
let sql;

app.set("view engine", "ejs");
app.use(express.static("public"));

// var sqldelete= "DELETE FROM projects WHERE id = ?;"
// db1.run(sqldelete, 8, function(err) {
//   if(err) {
//     return console.log(err.message);
//   }
//   console.log('Row was deleted to the table: ${this.lastID}');
// })

//GET РЕАЛИЗОВАНО
app.get("/", (req, res) => {
  console.log(req.headers["cookie"]);
  res.render("mainpage", 
  { 
    username: req.session.username 
  });
  //res.send({message: 'HERE WE GO!'});
});

app.post("/", (req, res) => {
  console.log(req.headers["cookie"]);
  req.session.username = undefined;
  req.session.password = undefined;
  req.session.email = undefined;
  res.render("mainpage", 
  { 
    username: req.session.username 
  });
  //res.send({message: 'HERE WE GO!'});
});

//GET РЕАЛИЗОВАНО
app.get("/course", (req, res) => {
  var sql = "select * from courses";
  console.log(req.headers["cookie"]);
  //res.render('coursechoice', db.courses)
  db1.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.render("coursechoice", {
      data: row,
      username: req.session.username,
    });
  });
 /* res.render("coursechoice", {
    username: req.session.username,
  }); */
});

//GET РЕАЛИЗОВАНО
// app.get('/course/:id', (req, res) => {
//   console.log(req.headers['cookie'])
//   const foundCourse=db.courses.find(c=>c.id===+req.params.id);

//   if(!foundCourse)
//   {
//     return;
//   }
//  res.render('coursemain', foundCourse)
// })

app.get("/course/:id", (req, res, next) => {
  var sql = "select * from courses where id = ?";
  var params = [req.params.id];
  db1.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.render("coursemain", {
      data: row,
      username: req.session.username,
    });
  });
});

//GET РЕАЛИЗОВАНО
app.get("/course/:id/:page", (req, res) => {
  //   console.log(req.headers['cookie'])
  //   const foundCourse=db.courses.find(c=>c.id===+req.params.id);
  //   if(!foundCourse)
  //   {
  //     return;
  //   }
  //   const foundPage=foundCourse.pages.find(c=>c.page===+req.params.page)
  //   if(!foundPage)
  //   {
  //     return;
  //   }
  //  let returnVals= JSON.parse(JSON.stringify({data1: foundCourse, data2: foundPage}));
  //  console.log(returnVals)
  //  res.render('course', returnVals)
  var sql = "select * from courses where id = ?";
  var params = [req.params.id];
  let pages;
  db1.get(sql, params, (err, row3) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    pages = row3.pageNumbers;
    console.log(pages);
    var error;
    sql = "select * from humans";
    var sqlquery = "";
    console.log(pages);
    params = [req.params.page];
    var taskdatabase;
    db1.all(sql, [], (err, row2) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        taskdatabase = row2;
      }
    });
    var select = {
      id: 1,
      sex: 1,
      name: 1,
      surname: 1,
      age: 1,
    };
    var rightdatabase;
    sql = "select * from course_id_" + req.params.id + " where id = ?";
    params = [req.params.page];
    db1.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      db1.all(row.rightsqlquery, [], (err, row1) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        rightdatabase = row1;
      });
      console.log({
        data: row,
        courseid: req.params.id,
        pages: pages,
        username: req.session.username,
        taskdatabase: taskdatabase,
        select: select,
        sqlquery1: sqlquery,
        rightdatabase: rightdatabase,
        error: undefined,
      });
      var rightdatabase;
      var newsql='select * from humans'
      db1.all(newsql, [], (err1,row1) => {
       if (err1) {
         res.status(400).json({ error: err.message });
         return;
       }
       else
       {
         rightdatabase=row1;
         res.render("course", {
          data: row,
          courseid: req.params.id,
          pages: pages,
          username: req.session.username,
          taskdatabase: taskdatabase,
          select: select,
          sqlquery1: sqlquery,
          rightdatabase: rightdatabase,
          error: undefined,
        });
       }

      });
    });
  });
});

app.post("/course/:id/:page", (req, res, next) => {
  //var sql2 = "select * from courses where id = ?"
  var sql2 = req.body.codetext;
  console.log(sql2);

  var sql = "select * from courses where id = ?";
  var params = [req.params.id];
  var pages;
  db1.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    pages = row.pageNumbers;
    //sql="select * from humans"
    var select = {
      id: undefined,
      sex: undefined,
      name: undefined,
      surname: undefined,
      age: undefined,
    };
    params = [req.params.page];
    var error = undefined;
    var taskdatabase;
    db1.all(sql2, [], (err, row) => {
      if (err) {
        //res.status(400).json({"error":err.message});
        error = err.message;
        //return;
      } else {
        taskdatabase = row;
        row.forEach((rows) => {
          if (rows.id != undefined) {
            select.id = 1;
            console.log(rows.id);
          }
          if (rows.sex != undefined) {
            select.sex = 1;
            console.log(rows.sex);
          }
          if (rows.name != undefined) {
            select.name = 1;
            console.log(rows.name);
          }
          if (rows.surname != undefined) {
            select.surname = 1;
            console.log(rows.surname);
          }
          if (rows.age != undefined) {
            select.age = 1;
            console.log(rows.age);
          }
        });
      }
    });

    sql = "select * from course_id_" + req.params.id + " where id = ?";
    params = [req.params.page];
    var rightdatabase;
    db1.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      db1.all(row.rightsqlquery, [], (err, row1) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        //  rightdatabase=row1;
        // rightdatabase.age
        console.log(row.rightsqlquery);
        console.log(pages);
      });

      var rightdatabase;
      var newsql='select * from humans'
      db1.all(newsql, [], (err1,row1) => {
       if (err1) {
         res.status(400).json({ error: err.message });
         return;
       }
       else
       {
         rightdatabase=row1;
         res.render("course", {
          data: row,
          courseid: req.params.id,
          pages: pages,
          username: req.session.username,
          taskdatabase: taskdatabase,
          select: select,
          sqlquery1: sql2,
          rightdatabase: rightdatabase,
          error: error,
        });
       }
      });
      
    });
  });
});

//GET РЕАЛИЗОВАНО
app.get("/sandbox", (req, res) => {
  var sql = "select * from projects";
  console.log(req.headers["cookie"]);
  //res.render('coursechoice', db.courses)
  db1.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.render("createproject", {
      data: row,
      username: req.session.username,
    });
  });
  //   console.log(req.headers['cookie'])
  // res.render('createproject', {"username": req.session.username})
});

app.get("/sandbox/:id", (req, res, next) => {
  var sqlquery = "";
  var sql = "select * from humans";

  // params = [req.params.page]
  var taskdatabase;
  db1.all(sql, [], (err, row2) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      taskdatabase = row2;
    }
  });
  var select = {
    id: 1,
    sex: 1,
    name: 1,
    surname: 1,
    age: 1,
  };
  var rightdatabase;
  sql = "select * from projects where id = ?";
  var params = [req.params.id];

  db1.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (
      (row.author == req.session.username && row.private == "true") ||
      row.private == "false"
    ) {
      console.log({
        data: row,
        courseid: req.params.id,
        username: req.session.username,
        taskdatabase: taskdatabase,
        select: select,
        sqlquery1: sqlquery,
        rightdatabase: rightdatabase,
        error: undefined,
      });
     var rightdatabase;
     var newsql='select * from humans'
     db1.all(newsql, [], (err1,row1) => {
      if (err1) {
        res.status(400).json({ error: err.message });
        return;
      }
      else
      {
        rightdatabase=row1;
        res.render("code-editor", {
          data: row,
          courseid: req.params.id,
          username: req.session.username,
          taskdatabase: taskdatabase,
          select: select,
          sqlquery1: sqlquery,
          rightdatabase: rightdatabase,
          error: undefined,
        });
      }
     });

    } else {
      res.render("error", {
        username: req.session.username,
      });
    }
  });

  // db1.get(sql, params, (err, row) => {
  //     if (err) {
  //       res.status(400).json({"error":err.message});
  //       return;
  //     }
  //     if((row.author==req.session.username && row.private=="true") || row.private=="false")
  //     {
  //     console.log("connect to code-editor")
  //     res.render('code-editor', {
  //         "data":row,
  //         "username": req.session.username
  //     })
  //   }
  //   else{
  //     res.render('error', {
  //       "username": req.session.username
  //   })
  //   } });
});

//обновление проекта
app.post("/sandbox/:id", (req, res, next) => {
  console.log(req.body.projectDescription);
  console.log(req.body.query);
  // var sql = "select * from projects where id = ?"
  var sql =
    "Update projects set autosave=?, private=?, projectDescription=? where id=?";
  var private;
  var autosave;
  //console.log(req.projectDescription);
  if (req.body.projectDescription != undefined) {
    if (req.body.autosave) {
      console.log("true");
      autosave = "true";
    } else {
      console.log("false");
      autosave = "false";
    }
    if (req.body.private) {
      console.log("true");
      private = "true";
    } else {
      console.log("false");
      private = "false";
    }
    console.log("ПРОВЕРКА");
    var params = [
      autosave,
      private,
      req.body.projectDescription,
      req.params.id,
    ];

    //ОБНОВЛЕНИЕ НАСТРОЕК ПРОЕКТА
    db1.run(sql, params, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("row was updated!");
    });
    // }

    var sqlquery = "";

    sql = "select * from humans";

    // params = [req.params.page]
    var taskdatabase;
    ////
    db1.all(sql, [], (err, row2) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        taskdatabase = row2;
      }
    });
    var select = {
      id: 1,
      sex: 1,
      name: 1,
      surname: 1,
      age: 1,
    };
    var rightdatabase;
    // sql = "select * from projects where id = ?"
    // var params = [req.params.id]

    // db1.get(sql, params, (err, row) => {
    // if (err) {
    //   res.status(400).json({"error":err.message});
    //   return;
    //
    //    console.log({
    //      "data":row,
    //      "courseid": req.params.id,
    //      "username": req.session.username,
    //      "taskdatabase": taskdatabase,
    //      "select": select,
    //      "sqlquery1": sqlquery,
    //      "rightdatabase": rightdatabase,
    //      "error": undefined
    //  })
    //     res.render('code-editor', {
    //         "data":row,
    //         "courseid": req.params.id,
    //         "username": req.session.username,
    //         "taskdatabase": taskdatabase,
    //         "select": select,
    //         "sqlquery1": sqlquery,
    //         "rightdatabase": rightdatabase,
    //         "error": undefined
    //     })
    //   })

    // sql = "select * from projects where id = ?"

    sql = "select * from projects where id = ?";
    params = [req.params.id];
    ////РЕНДЕР СТРАНИЦЫ
    db1.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      //  row.projectDescription = req.body.projectDescription
      //  row.autosave = req.body.autosave
      //  row.private = req.body.private
      var rightdatabase;
      var newsql='select * from humans'
      db1.all(newsql, [], (err1,row1) => {
        if (err1) {
          res.status(400).json({ error: err.message });
          return;
        }
        else
        {
          rightdatabase=row1;
          res.render("code-editor", {
            data: row,
            courseid: req.params.id,
            username: req.session.username,
            select: select,
            taskdatabase: taskdatabase,
            sqlquery1: sqlquery,
            rightdatabase: rightdatabase,
            error: undefined,
          });
        }
       });


    });
  } else {
    console.log(req.body.secretinput);
    //  if(req.body.secretinput != undefined)
    //{
    var sql2 = req.body.query;
    console.log(sql2);

    var sql = "select * from courses where id = ?";
    var params = [req.params.id];
    var pages;
    db1.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      pages = row.pageNumbers;
      //sql="select * from humans"
      var select = {
        id: undefined,
        sex: undefined,
        name: undefined,
        surname: undefined,
        age: undefined,
      };
      params = [req.params.page];
      var error = undefined;
      var taskdatabase;
      db1.all(sql2, [], (err, row) => {
        if (err) {
          //res.status(400).json({"error":err.message});
          error = err.message;
          //return;
        } else {
          taskdatabase = row;
          row.forEach((rows) => {
            if (rows.id != undefined) {
              select.id = 1;
              console.log(rows.id);
            }
            if (rows.sex != undefined) {
              select.sex = 1;
              console.log(rows.sex);
            }
            if (rows.name != undefined) {
              select.name = 1;
              console.log(rows.name);
            }
            if (rows.surname != undefined) {
              select.surname = 1;
              console.log(rows.surname);
            }
            if (rows.age != undefined) {
              select.age = 1;
              console.log(rows.age);
            }
          });
        }
      });
      sql = "select * from projects where id = ?";
      params = [req.params.id];
      db1.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        var rightdatabase;
        var newsql='select * from humans'
        db1.all(newsql, [], (err1,row1) => {
          if (err1) {
            res.status(400).json({ error: err.message });
            return;
          }
          else
          {
            rightdatabase=row1;
            res.render("code-editor", {
              data: row,
              courseid: req.params.id,
              username: req.session.username,
              taskdatabase: taskdatabase,
              select: select,
              rightdatabase: rightdatabase,
              sqlquery1: sql2,
              error: error,
            });
          }
         });

      });
    });
  }
});

//GET РЕАЛИЗОВАНО
// app.get('/sandbox/:id', (req, res) => {
//   console.log(req.headers['cookie'])
//   //Перед этим мы находим название и id проекта из json-файла dataprojects
//   //res.json(daraprojects)
//   const foundProject = db.projects.find(c=>c.id===+req.params.id);

//   if(!foundProject)
//   {
//     return;
//   }
//   if(foundProject.authoruser === req.session.username)
//   {
//     res.render('code-editor', foundProject)
//   }
//   else
//   {
//     return
//   }
// })

//POST РЕАЛИЗОВАНО
app.post("/sandbox", urlencodedParser, (req, res) => {
  //  datacourse.courses.push() - здесь будет создаваться новый проект юзера
  //i++;
  console.log(req.body.projectname);
  console.log(req.body.projectDescription);
  //  const createdProject = {
  //      id: i,
  //      projectname: req.body.projectname,
  //      authoruser: req.session.username,
  //      autosave: false,
  //      private: false,
  //      project_description: "Здесь хранится дефолтное описание проекта"
  //  }
  // db.projects.push(createdProject);
  //console.log(db)
  var private;
  var autosave;
  //console.log(req.body.autosave);
  //if(req.body.private != undefined)
  // {
  if (req.body.autosave) {
    console.log("true");
    autosave = "true";
  } else {
    console.log("false");
    autosave = "false";
  }
  if (req.body.private) {
    console.log("true");
    private = "true";
  } else {
    console.log("false");
    private = "false";
  }

  db1.run(
    "INSERT INTO projects (author, projectname, projectDescription, autosave, private) VALUES (?,?,?,?,?)",
    [
      req.session.username,
      req.body.projectname,
      req.body.projectDescription,
      autosave,
      private,
    ],
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Row was added to the table: ${this.lastID}");
      var sql = "select * from projects";
      console.log(req.headers["cookie"]);
      //res.render('coursechoice', db.courses)
      db1.all(sql, [], (err, row1) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.render("createproject", {
          data: row1,
          username: req.session.username,
        });
      });
    }
  );
});

//DELETE
app.post("/sandbox/:id/delete", (req, res) => {
  var sql = "DELETE FROM projects WHERE id = ?;";
  db1.run(sql, req.params.id, function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Row was deleted to the table: ${this.lastID}");
  });
  sql = "select * from projects";
  console.log(req.headers["cookie"]);
  //res.render('coursechoice', db.courses)
  db1.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.render("createproject", {
      data: row,
      username: req.session.username,
    });
  });
  // здесь будет удаляться проект, созданный юзером.
  //console.log(req.headers['cookie'])
  //Перед этим мы находим название и id проекта из json-файла dataprojects
});

app.put("/sandbox/:projectname", (req, res) => {
  // обновление проекта
});

//GET РЕАЛИЗОВАНО
app.get("/user", (req, res) => {
  console.log(req.headers["cookie"]);
  // req.session.username = foundUser
  // res.send(`Зашел пользователь ${req.body.username} с паролем ${req.body.password}`)
  sql = "select * from projects where author = ?";
  var params = [req.session.username];
  db1.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    //console.log
    res.render("user", {
      data: row,
      username: req.session.username,
      email: req.session.email,
    });
  });
});

//let returnVals = JSON.parse(JSON.stringify({data: db.projects, username: req.session.username}));
// let data1 = {
//var data =
// var userproject = [
// { projectname: 'one' },
//{ projectname: 'two' }
//];
// res.render('user', {username: req.session.username})

//GET РЕАЛИЗОВАНО
// app.get('/user/:username', (req, res) => {
//   console.log(req.headers['cookie'])

//   res.render('user', {username: req.session.username})
// })

// app.get("/user", (req, res, next) => {
//   // var data1;
//   // var sql = "select * from users where id = ?"
//   // var params = [req.params.id]
//   // db1.get(sql, params, (err, row) => {
//   //     if (err) {
//   //       res.status(400).json({"error":err.message});
//   //       return;
//   //     }
//   //     data1 = row;
//   //   });
//     //console.log(data1)
//     var sql = "select * from projects"
//     db1.all(sql, [], (err, row) => {
//       if (err) {
//         res.status(400).json({"error":err.message});
//         return;
//       }
//       //data1 = row;
//       res.render('user', {
//           "data":row,
//           "username":req.session.username
//       })
//     });
// });

//POST РЕАЛИЗОВАНО
projects: app.post("/user", urlencodedParser, function (req, res) {
  var foundUser;
  // поиск пользователся в базе данных;
  var _row;
  var sql = "select * from users";
  console.log(req.headers["cookie"]);
  //res.render('coursechoice', db.courses)
  db1.all(sql, [], (err, row1) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    //_row = row;
    //res.render('user', {
    //   "data":row
    //})
    if (
      req.session.username !== undefined &&
      !req.session.password !== undefined
    ) {
    }
    //  for(var i = 0; i<_row.length; i++)
    //  {
    //   var u = _row[i]
    //   if(u.username == req.body.username && u.password == req.body.password)
    //     {
    //       foundUser = u.username
    //       req.session.username = _row.username
    //       req.session.password = _row.password
    //       break
    //     }
    //  }
    for (var user of row1) {
      console.log(user.username);
      console.log(user.username);
      if (
        (user.username == req.body.username &&
          user.password == req.body.password) ||
        (user.email == req.body.username && user.password == req.body.password)
      ) {
        foundUser = user.username;
        req.session.username = user.username;
        req.session.password = user.password;
        req.session.email = user.email;
        break;
      }
    }

    // если ли логин пользователя в системе
    if (foundUser !== undefined) {
      // req.session.username = foundUser
      // res.send(`Зашел пользователь ${req.body.username} с паролем ${req.body.password}`)
      sql = "select * from projects where author = ?";
      var params = [req.session.username];
      db1.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        //console.log
        res.render("user", {
          data: row,
          username: req.session.username,
          email: req.session.email,
        });
      });
      //res.render('user', {username: req.session.username})
    } else {
      console.log("Login failed ", req.body.username);
      res.status(401).send("Login error");
    }
  });
});

//GET РЕАЛИЗОВАНО
app.get("/register", (req, res) => {
  res.render("register", { username: req.session.username });
});

app.post("/register", urlencodedParser, (req, res, next) => {
  db1.run(
    "INSERT INTO users (username, email, password) VALUES (?,?,?)",
    [req.body.username, req.body.email, req.body.password],
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Row was added to the table: ${this.lastID}");
    }
  );
  res.render("user", { username: req.session.username });
  //res.render('register')
});

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
