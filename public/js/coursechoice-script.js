//db = require("/js/db-script.js")

//var sql="select * from courses";
//var db_row;

//db.all(sql, [], (err,row) => {
     // if (err) {
     //   res.status(400).json({ error: err.message });
      //  return;
    //  }
   //   console.log("SUCCEED")
    //  db_row=row;
    //   fetch("http://localhost:3000/course")
    //   .then(res=>res.json())
    //   .then((data) => {
    //     let output= "";
    //     for(var i=0; i < db_row.length; i++) {
    //         output +=  `<a class="courselink" href="/course/${db_row[i].id}">
    //        <div class="courseblock">
    //         <div class="courseimage"></div>
    //          <div class="coursebox">
    //           <p class="coursename">${db_row[i].coursename}</p>
    //            <p class="coursedescription">
    //             ${db_row[i].courseDescription}
    //            </p>
    //           </div>
    //        </div>
    //     </a>`
    //     }
    // })
    // document.getElementById('coursedata').innerHTML=output;

      /*  <%# for(var i=0; i < data.length; i++) { %>
      <a class="courselink" href="/course/<%#= data[i].id %>">
              <div class="courseblock">
                <div class="courseimage"></div>
                <div class="coursebox">
                  <p class="coursename"><%= data[i].coursename %></p>
                  <p class="coursedescription">
                    <%= data[i].courseDescription %>
                  </p>
                </div>
              </div>
            </a>
            <% } %> */
      
//});