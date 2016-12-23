var currentStudent = null;

function setupCurrentAccount() {
  var account = Cookies.get('account');
  currentStudent = getStudentFromLocalByAccount(account);
  $("#button-current-account").text("当前账户: " + currentStudent.name);
}

function setupCourseTable() {
  var courses = getCoursesFromLocal();
  var selectedCourses = getCoursesFromLocalByStudent(currentStudent);
  var unselectedCourses = new Array();
  for (var i = 0; i < courses.length; ++i) {
    if (selectedCourses.find(function(c) { return c.name == courses[i].name; }) == null) {
      unselectedCourses.push(courses[i]);
    }
  }
  $("#tbody-courses").text("");
  selectedCourses.forEach(function(c, i) { appendCourseToCourseTable(c, i, true); });
  unselectedCourses.forEach(function(c, i) { appendCourseToCourseTable(c, i, false); });
}

function appendCourseToCourseTable(c, i, selected) {
  var tr = $("<tr></tr>");
  var students = getStudentsFromLocalByCourse(c);
  var rest = c.capacity - students.length;
  
  var status = $("<span></span>");
  status.addClass("tag");
  status.addClass(selected ? "is-success" : "is-warning");
  status.text(selected ? "已选" : "未选");

  var op = $("<button></button>");
  op.addClass("button");
  if (rest <= 0 && !selected) op.addClass("is-disabled");
  op.addClass(selected ? "op-unselect" : "op-select");
  op.addClass(selected ? "is-danger" : "is-success");
  op.text(selected ? "退选" : "选课");
  op.click(function() { onClickOperator($(this)); });

  tr.append(
      generateTd(i), 
      generateTd(c.name, "class-name"),
      generateTd(rest),
      generateTd(c.capacity),
      generateTd(status),
      generateTd(op));
  $("#tbody-courses").append(tr);
}

function onClickOperator(op) {
  var courseName = op.parent().parent().children("td.class-name").text();
  if (op.hasClass("op-select")) {
    addCourseStudentToLocal(courseName, currentStudent.account);
    setupCourseTable();
  } else {
    deleteCourseStudentToLocal(courseName, currentStudent.account);
    setupCourseTable();
  }
  return;
}

window.onload = function() {
    $(document).ready(function() {
      checkCookie("student");
      setupCurrentAccount();
      setupCourseTable();
    });
}
