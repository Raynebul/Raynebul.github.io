/*fetch("http://localhost:3000/")
      .then(res=>res.json())
      .then(console.log)

*/

// var db = require("/js/db-script.js");
// var sql="select * from courses"
// var db_row

// db.all(sql, [], (err,row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       db_row=row.json();
// });
// let user = {
//       name: 'John',
//       surname: 'Smith'
//     };
    
//     let response = await fetch('http://localhost:3000', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(user)
//     });
    
//     let result = await response.json();
//     alert(result.message);


//fetch('/database.sqlite')
//.then(response => response.json())
//.then(response => response.map(data => {
  
 //Let us display the data and see the result
  //console.log(data)
//}).catch(err => console.log(`error is: ${err}`)))

// .then(function (response) {
//     responseClone = response.clone(); // 2
//     return response.json();
// })
// .then(function (data) {
//     // Do something with data
// }, function (rejectionReason) { // 3
//     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
//     responseClone.text() // 5
//     .then(function (bodyText) {
//         console.log('Received the following instead of valid JSON:', bodyText); // 6
//     });
// });