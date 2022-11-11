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

 document.getElementById('enter').onclick =function() {
   var usernameCookie = document.getElementById('userLogin').value;
   var passwordCookie = document.getElementById('userPassword').value;

   var cookie =  `${usernameCookie}=${passwordCookie}`;
   document.cookie = cookie;
};