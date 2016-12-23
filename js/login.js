function login() {
  var person = getPersonFromInput();
  var persons = getStudentsFromLocal();
  // 遍历本地数据，如果存在匹配则返回成功
  if (persons.find(function(p) { return person.validateWith(p); }) != null) {
    Cookies.set('account', person.account);
    Cookies.set('category', person.category);
    return true;
  }
  if (person.account == "0"
      && person.password == "0" 
      && !person.isStudent()) {
    Cookies.set('account', person.account);
    Cookies.set('category', person.category);
    return true;
  }
  return false;
}

function register() {
  var person = getPersonFromInput();
  var persons = getStudentsFromLocal();
  if (person.name == ""
      || person.account == ""
      || person.password == ""
      || person.department == "") {
    alert("输入为空或不合法");
    return;
  }

  // 遍历本地数据，如果存在该用户名，则不允许注册
  if (persons.find(function(p) { return person.hasSameAccoutNameWith(p); }) != null) {
    alert("该用户名已存在，无法注册");
    return false;
  }
 
  // 将新用户的信息写入用户数据列表
  if (person.isStudent()) {
    persons.push(person);
    localStorage.persons = JSON.stringify(persons);
    return true;
  } else {
    alert("您不能选择教师身份注册");
    return false;
  }
}

function getPersonFromInput() {
  var account = $("#account").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var department = $("#department").val();
  var category = $(":radio:checked").first().val();

  return {
    account: account,
    name: name,
    category: category,
    department: department,
    password: password,
    isStudent: function() { return this.category == "student"; },
    hasSameAccoutNameWith: function(p) {
      return this.account == p.account && this.category == p.category;
    },
    validateWith: function(p) {
      return this.hasSameAccoutNameWith(p) && this.password == p.password;
    }
  };
}

function getStudentsFromLocal() {
  var personsJson = localStorage.persons;
  if (personsJson == null) personsJson = "[]";
  return JSON.parse(personsJson);
}

function toNextView() {
  if ($(":radio:checked").first().val() == "student") {
    window.location.href = "elective.html";
  } else {
    window.location.href = "edit.html";
  }
}

window.onload = function() {
    $(document).ready(function() {
        $("#button-login").click(function() {
            if (login()) toNextView();
            else alert("用户名或密码错误");
            return false;
        });
        $("#button-register").click(function() {
            if (register()) alert("注册成功，可登录使用");
            return false;
        });
    });
}
