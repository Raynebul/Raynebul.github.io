function alertWithMessage() {
    alert("Проверка работы");
  }


  
function eraseTheText(string) {
    //alert("Очистить");
    document.getElementById(string).value = "";
  }

 function runCode() {
  alert("Выполнение кода");

 } 

// async function deleteId() {
//   alert("Выполнение кода");
//   const res = await fetch(`/sandbox/${id}`, {
//     method: 'DELETE',
//   });
//  } 


 window.onload = function() {
  const buttonToBeClicked = document.getElementById("enter");
  var inputs = document.getElementsByTagName("input");

  //var usernameCookie = document.getElementById('userLogin').value;
  //var passwordCookie = document.getElementById('userPassword').value;

  buttonToBeClicked.addEventListener('click', function() {
   // alert("Выполнение кода");
  //   var xhr=new XMLHttpRequest();

  //   xhr.open('POST', '/sandbox');

  //   var userData = {
  //     username: inputs[0].value,
  //     password: inputs[1].value
  //   }
  //   alert(inputs[0].value + ' ' + inputs[1].value);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.send(JSON.stringify(userData));
    
    
  //   xhr.onload = function() {
  //     var resultText = XMLHttpRequest.responseText;
  //     alert(resultText)
  //   }

  //   xhr.onerror = function() {
  //     alert('server error!')
  //   }
  //  //var cookie =  `${usernameCookie}=${passwordCookie}`;
  //  // document.cookie = cookie; 

  })


 }

 async function EditProject(ProjectId) {
  const response = await fetch("sandbox/:id", {
      method: "PUT",
     // headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
          id: ProjectId
      })
  });
  if (response.ok === true) {
      const user = await response.json();
      reset();
      document.querySelector("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
  }
}


