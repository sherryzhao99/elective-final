//localStorage.claer();

function login() {
  // 获取输入内容
  var account = $("#account").val();
  var password = $("#password").val();
  var category = "";
  $(":radio:checked").each(function() {category += $(this).val();})

  // 获取本地存储用户信息列表
  var personsJson = localStorage.persons;
  //alert(personsJson);
  if (personsJson == null) return false;
  var persons = JSON.parse(personsJson);

  // 遍历本地数据，如果存在匹配则返回成功
  for (var i = 0; i < persons.length; ++i) {
    if (persons[i].account == account
      && persons[i].password == password
      && persons[i].category == category) {
      //setCookie();
      document.cookie="currentname"+"="+escape(account);
      //document.cookie="ii"+"="+"asdd";
      //alert(document.cookie);
      alert("Welcome again "+account);
      window.open("elective.html");
      //location.reload();
      return true;
    }
  }
  if(account == '0' && password == "0" && category == 'teacher') {
    alert("Welcome teacher!");
    window.open("edit.html");
    window.close("login.html");
    return true;

    //$(":radio:checked").each(function() {category += $(this).val();})

  }

}

function register() {
  // 获取输入内容
  var account = $("#account").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var department = $("#department").val();
  var category = "";
  $(":radio:checked").each(function() {category += $(this).val();})
  var personsJson = localStorage.persons;
  if (personsJson == null) personsJson = "[]";
  var persons = JSON.parse(personsJson);

  // 遍历本地数据，如果存在该用户名，则不允许注册
  for (var i = 0; i < persons.length; ++i) {
    if (persons[i].account == account
      && persons[i].category == category) {
      alert("该用户名已存在，无法注册。");
      return false;
    }
  }
 //localStorage.clear();
  // 将新用户的信息写入用户数据列表
  var person = {
    account: account,
    name: name,
    category: category,
    department: department,
    password: password
  }
  if(category == "student") {
    persons.push(person);
    localStorage.persons = JSON.stringify(persons);


     //alert(JSON.stringify(persons));
    return true;
  }
  else {
    alert("您不能选择教师身份注册。");
    return false;
  }
}

window.onload = function() {
    $(document).ready(function() {
         //localStorage.clear();
        $("#button-login").click(function() {
          if (login()) {
            window.close("login.html");
          }
          //if(login()) window.location.href = "edit.html";
          else {
            alert("用户名或密码错误");
          }
          return false;
        });
        $("#button-register").click(function() {
          if (register()) {
            alert("注册成功，可登录使用");
            //window.open("login.html");
            //window.close();

          }
          return false;
        });
    });
}
