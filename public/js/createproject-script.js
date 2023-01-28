CreateProject(data) 
{
   var userProjectname = document.getElementById("userProjectname").value
   var description = document.getElementById("description").value
   fetch("http://localhost:3000/sandbox", {
    method: 'GET',
    headers: {
        // Добавляем необходимые заголовки
        'Content-type': 'application/json; charset=UTF-8',
      },
   })
   .then(res=>res.json())
   .then((data)=>console.log(data))
}