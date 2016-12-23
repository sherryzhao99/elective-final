function getCoursesFromLocal() {
  var coursesJson = localStorage.courses;
  if (coursesJson == null) coursesJson = "[]";
  return JSON.parse(coursesJson);
}

function getCourseFromLocalByName(name) {
  var courses = getCoursesFromLocal();
  return courses.find(function(c) { return c.name == name; });
}

function addCourseToLocal(c) {
  var courses = getCoursesFromLocal();
  courses.push(c);
  localStorage.courses = JSON.stringify(courses);
}

function updateCourseToLocal(oc, nc) {
  var courses = getCoursesFromLocal();
  var i = courses.findIndex(function(c) { return c.name == oc.name; });
  courses[i] = nc;
  localStorage.courses = JSON.stringify(courses);

  var courseStudentMaps = getCourseStudentFromLocal()
      .map(function(cs) {
          if (cs.courseName == oc.name) cs.courseName = nc.name;
          return cs;
      });
  localStorage.courseStudentMaps = JSON.stringify(courseStudentMaps);
}

function deleteCourseToLocal(course) {
  var courses = getCoursesFromLocal()
      .filter(function(c) { return c.name != course.name; });
  localStorage.courses = JSON.stringify(courses);

  var courseStudentMaps = getCourseStudentFromLocal()
      .filter(function(cs) { return cs.courseName != course.name; });
  localStorage.courseStudentMaps = JSON.stringify(courseStudentMaps);
}

function getStudentsFromLocal() {
  var personsJson = localStorage.persons;
  if (personsJson == null) personsJson = "[]";
  return JSON.parse(personsJson);
}

function getStudentFromLocalByAccount(a) {
  var students = getStudentsFromLocal();
  return students.find(function(s) { return s.account == a; });
}

function getCourseStudentFromLocal() {
  var courseStudentMaps = localStorage.courseStudentMaps;
  if (courseStudentMaps == null) courseStudentMaps = "[]";
  return JSON.parse(courseStudentMaps);
}

function getStudentsFromLocalByCourse(course) {
  var courseStudentMaps = getCourseStudentFromLocal();
  var students = getStudentsFromLocal();
  return courseStudentMaps
      .filter(function(cs) { return cs.courseName == course.name; })
      .map(function(cs) { return cs.account; })
      .map(function(a) { return students.find(function(s) { return s.account == a; }); });
}

function getCoursesFromLocalByStudent(student) {
  var courseStudentMaps = getCourseStudentFromLocal();
  var courses = getCoursesFromLocal();
  return courseStudentMaps
      .filter(function(cs) { return cs.account == student.account; })
      .map(function(cs) { return cs.courseName; })
      .map(function(n) { return courses.find(function(c) { return c.name == n; }); });
}

function addCourseStudentToLocal(courseName, studentAccount) {
  var courseStudentMaps = getCourseStudentFromLocal();
  var courseStudent = {
    courseName: courseName,
    account: studentAccount
  };
  courseStudentMaps.push(courseStudent);
  localStorage.courseStudentMaps = JSON.stringify(courseStudentMaps);
}

function deleteCourseStudentToLocal(courseName, studentAccount) {
  var courseStudentMaps = getCourseStudentFromLocal()
      .filter(function(cs) { return cs.courseName != courseName || cs.account != studentAccount; });
  localStorage.courseStudentMaps = JSON.stringify(courseStudentMaps);  
}