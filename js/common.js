function exit() {
  Cookies.remove('account');
  Cookies.remove('category');
  window.location.href = "login.html";
}

function generateTd(content, classType) {
  var td = $('<td style="vertical-align:middle"></td>').append(content);
  if (classType != null) td.addClass(classType);
  return td;
}

function checkCookie(category) {
  if (Cookies.get("category") != category) {
    alert("登录超时，请重新登录");
    exit();
  }
}