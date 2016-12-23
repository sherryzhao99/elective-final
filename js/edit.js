var currentCourse = null;

function deleteCourse() {
  deleteCourseToLocal(currentCourse);
  alert("课程[" + currentCourse.name + "]删除成功");
  setupCourseTable();
  $("#button-current-course").text("当前课程: 无");
  $("#tbody-students").text("");
}

function editCourse() {
  var course = getEditCourseInput();
  if (!course.isValid) {
    alert("输入不合法");
    return;
  }
  var students = getStudentsFromLocalByCourse(currentCourse);
  if (course.capacity < students.length) {
    alert("修改后的人数上限不得小于当前已选人数");
    return;
  }
  updateCourseToLocal(currentCourse, course);
  alert("原课程[" + currentCourse.name + "]编辑成功");
  setupCourseTable();
  $("#input-query-course-name").val(course.name);
  queryCourse();
  $("#input-edit-course-name").val("");
  $("#input-edit-course-capacity").val("");
}

function getEditCourseInput() {
  var name = $("#input-edit-course-name").val();
  var capacity = $("#input-edit-course-capacity").val();
  return generateCourse(name, capacity);
}

function queryCourse() {
  var name = $("#input-query-course-name").val();
  var course = getCourseFromLocalByName(name);
  if (course == null) {
    alert("该课程不存在");
    return;
  }
  currentCourse = course;
  setupStudentsTable(currentCourse);
  $("#button-current-course").text("当前课程: " + currentCourse.name);
  $("#input-query-course-name").val("");
}

function setupStudentsTable(c) {
  var students = getStudentsFromLocalByCourse(c);
  $("#tbody-students").text("");
  students.forEach(appendStudentToStudentTable);
}

function appendStudentToStudentTable(s, i) {
  var tr = $("<tr></tr>");
  tr.append(generateTd(i), generateTd(s.account), generateTd(s.name), generateTd(s.department));
  $("#tbody-students").append(tr);
}

function addCourse() {
  var course = getAddCourseInput();
  var courses = getCoursesFromLocal();
  if (!course.isValid()) {
    alert("输入不合法");
    return;
  }
  if (courses.find(function(c) { return course.hasSameNameWith(c); }) != null) {
    alert("该课程名已存在，无法添加");
    return;
  }
  addCourseToLocal(course);
  appendCourseToCourseTable(course);
  $("#input-new-course-name").val("");
  $("#input-new-course-capacity").val("");
}

function getAddCourseInput() {
  var name = $("#input-new-course-name").val();
  var capacity = $("#input-new-course-capacity").val();
  return generateCourse(name, capacity);
}

function generateCourse(name, capacity) {
  capacity = capacity == "" ? 0 : Number(capacity);
  return {
    name: name,
    capacity: capacity,
    hasSameNameWith: function(c) { return this.name == c.name; },
    isValid: function() {
      return this.name != "" && this.capacity > 0;
    }
  };
}

function setupCourseTable() {
  var courses = getCoursesFromLocal();
  $("#tbody-courses").text("");
  courses.forEach(appendCourseToCourseTable);
}

function appendCourseToCourseTable(c) {
  var tr = $("<tr></tr>");
  var students = getStudentsFromLocalByCourse(c);
  tr.append(generateTd(c.name), generateTd(students.length), generateTd(c.capacity));
  $("#tbody-courses").append(tr);
}

 window.onload = function() {
    $(document).ready(function() {
        checkCookie("teacher");
        setupCourseTable();
    });
}
