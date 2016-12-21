//localStorage.clear();
function reopen() {
  //alert("aa");
  window.location.reload();
}
function showallcourses() {
  var coursesJson = localStorage.courses;
  if(coursesJson == null) tempallcourses = "没有课程.";
  else {
    var courses = JSON.parse(coursesJson);
    var tempallcourses = "";
    for(var i = 0; i<courses.length; ++i) {
      tempallcourses += courses[i].coursename + "：" +courses[i].maxperson +"；  ";
    }
  }
  $('#allcourses').text(tempallcourses);
}

//function exit() {
  /*var coursesJson = localStorage.courses;
  if(coursesJson != null) {
    var courses = JSON.parse(coursesJson);
    localStorage.courses = JSON.stringify(courses);
  }
  var personsJson = localStorage.courses;
  if(coursesJson != null) var courses = JSON.parse(coursesJson);
  var coursesJson = localStorage.courses;
  if(coursesJson != null) var courses = JSON.parse(coursesJson);

  localStorage.persons = JSON.stringify(persons);
  localStorage.stuselects = JSON.stringify(stuselects);*/
  //document.cookie="currentname"+"="+escape("");
  //window.location.href = "login.html";
//  window.close();
//}

function changename() {
  //alert(document.cookie);
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i = 0; i<arrCookie.length; i++){
    var arr = arrCookie[i].split("=");
     if(" currentcourse" == arr[0]){    //应该多一个空格！！
      var currentcourse1 = arr[1];
    }
  }
  //var obj = document.getElementById("coursename").value;
  //alert(currentcourse1);
  // document.getElementById("currentcourse").innerHTML = "currentcourse1";
  var uncodecurrentcourse1 = unescape(currentcourse1);
  //alert(uncodecurrentcourse1);
  $('#currentcourse').text(uncodecurrentcourse1);
}

function findCourse() {
  var coursename = $("#coursename2").val();
  //alert(coursename);
  var coursesJson = localStorage.courses;
  //alert(coursesJson);
  if(coursesJson == null) {
    alert("系统中没有课程。")
    return false;
  }
  var courses = JSON.parse(coursesJson);
  var stuselectsJson = localStorage.stuselects;
  if(stuselectsJson == null) {
    alert("目前没有学生选择此课程。");
    document.cookie = " currentcourse"+"="+escape(coursename);
    return true;
  }
  var stuselects = JSON.parse(stuselectsJson);
  //alert(stuselectsJson);
  var personsJson = localStorage.persons;
  if(personsJson == null) {
    alert("尚未有学生使用本系统。");
    return false;
  }
  var persons = JSON.parse(personsJson);
  var resultTableHtml = '';
  var count = 0;
  for (var i = 0; i < courses.length; ++i) {
    if (courses[i].coursename == coursename ){
      document.cookie = " currentcourse"+"="+escape(coursename);
       //alert(document.cookie);
      //alert(courses[i].coursename);
      for(var j = 0; j<stuselects.length; ++j) {
        var name = 0;
        if(stuselects[j].coursename == coursename) {
          name = stuselects[j].studentname;
          count++;
          //alert(name);
          for(var r = 0; r<persons.length; ++r) {
            if(persons[r].account == name) {
              resultTableHtml += '<tr><td>'+count+'</td><td>'+persons[r].account+'</td><td>'+persons[r].name+'</td><td>'+persons[r].department+'</td></tr>';
            }
            //else alert("aa");
          }
        }
      }
      $('#resultTable').html(resultTableHtml);
      return true;
    }
  }
  return false;
}

function renameCourse() {
  var newcoursename = $("#coursename3").val();
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i = 0; i<arrCookie.length; i++){
    var arr = arrCookie[i].split("=");
     if(" currentcourse" == arr[0]){    //应该多一个空格！！
      var currentcourse1 = arr[1];
    }
  }
  //alert(currentcourse1);
  var coursesJson = localStorage.courses;
  if (coursesJson == null) return false;
  var courses = JSON.parse(coursesJson);
  var flag = 0;
  var mark = 0;
  ///看有没有重复的名字，没有的话可以修改，改json
  for (var i = 0; i < courses.length; ++i) {
    if (courses[i].coursename == newcoursename) {
        flag= 1;
    }
  }
  if(flag == 1) {
    alert("该课程已存在。");
    return false;
  }
  else {
    for(var j = 0; j<courses.length; ++j) {
      if(courses[j].coursename == currentcourse1) {
        mark = j;
        courses[j].coursename = newcoursename;
        //alert(courses[j].coursename);
      }
    }
    localStorage.courses = JSON.stringify(courses);
    var stuselectsJson = localStorage.stuselects;
    if(stuselectsJson == null){
      return true;
    }
    else {
      var stuselects = JSON.parse(stuselectsJson);
      for(var j = 0; j < stuselects.length; ++j) {
        if(stuselects[j].coursename == currentcourse1) {
          stuselects[j].coursename = newcoursename;
        }
      }
      localStorage.stuselects = JSON.stringify(stuselects);
      //alert(stuselectsJson);
      return true;
    }
  }

}

function remaxCourse() {
  var newmaxperson = $("#maxperson3").val();
  if(newmaxperson <= 0 ) {
    alert("上限人数不合法。");
    return false;
  }
  var coursesJson = localStorage.courses;
  if (coursesJson == null) return false;
  var courses = JSON.parse(coursesJson);
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i = 0; i<arrCookie.length; i++){
    var arr = arrCookie[i].split("=");
     if(" currentcourse" == arr[0]){    //应该多一个空格！！
      var currentcourse1 = arr[1];
    }
  }
  //alert(currentcourse1);
  var stuselectsJson = localStorage.stuselects;
  if(stuselectsJson != null) {
    var stuselects = JSON.parse(stuselectsJson);
    var count = 0;
    for(var i = 0; i<stuselects.length; ++i) {
      if(stuselects[i].coursename == currentcourse1) {
        count ++;
      }
    }
    if(newmaxperson <= count) {
      alert("新的上限人数小于已选课的人数。");
      return false;
    }
  }
  ///////单独判断人数是否超出上限
  var flag = 0;
  for (var i = 0; i < courses.length; ++i) {
    if (courses[i].coursename == currentcourse1) {
      var intnewmaxperson = parseInt(newmaxperson);
      var intoldmaxperson = parseInt(courses[i].maxperson);
      var intleftperson = parseInt(courses[i].leftperson);
      courses[i].maxperson = newmaxperson;
      //alert(intleftperson);
      //alert(intoldmaxperson);
      //alert(intnewmaxperson);
      var newleftperson = intnewmaxperson - intoldmaxperson + intleftperson;
      //alert(newleftperson);
      courses[i].leftperson = newleftperson;
      flag = 1;
    }
  }
  if(flag==1) {
    localStorage.courses = JSON.stringify(courses);
    //alert(coursesJson);
    return true;
  }
  else return false;
}

function deleteCourse() {
  // 获取输入内容
  var coursename = $("#coursename4").val();
  var coursesJson = localStorage.courses;
  //alert(coursesJson);
  if (coursesJson == null) return false;
  var courses = JSON.parse(coursesJson);
  var stuselectsJson = localStorage.stuselects;
  if(stuselectsJson == null) {
    for (var i = 0; i < courses.length; ++i) {
      if (courses[i].coursename == coursename) {
        courses.splice(i,1);
        localStorage.courses = JSON.stringify(courses);
      }
    }
    return true;
  }
  var stuselects = JSON.parse(stuselectsJson);
  for (var i = 0; i < courses.length; ++i) {
    if (courses[i].coursename == coursename) {
      courses.splice(i,1);
      localStorage.courses = JSON.stringify(courses);
      for(var j = 0; j < stuselects.length; j++) {
        if(stuselects[j].coursename == coursename)
          stuselects.splice(j,1);
      }
      localStorage.stuselects = JSON.stringify(stuselects);
      return true;
    }
  }
}

function createCourse() {
  // 获取输入创建课程
  var coursename = $("#coursename1").val();
  var maxperson = $("#maxperson1").val();
  var leftperson = maxperson;
 //localStorage.clear();
  // 获取本地存储课程信息列表
  var coursesJson = localStorage.courses;
  //alert(coursesJson);
  if (coursesJson == null) coursesJson = "[]";
  var courses = JSON.parse(coursesJson);
  for (var i = 0; i < courses.length; ++i) {
    if (courses[i].coursename == coursename ){
      alert("该课程已存在。");
      //alert(courses[i].coursename);
      return false;
    }
  }

  // 将新课程的信息写入用户数据列表
  var course = {
    coursename: coursename,
    leftperson: leftperson,
    maxperson: maxperson
  }
  courses.push(course);
  localStorage.courses = JSON.stringify(courses);
  //alert(coursesJson);
  //alert(coursesJson);
  //alert(localStorage.courses);
  //alert(JSON.stringify(courses));
  return true;
}

 window.onload = function() {
    $(document).ready(function() {
        // localStorage.clear();
        showallcourses();
        //alert(document.cookie);
        //alert("aa");
        $("#button-create").click(function() {
          if (createCourse()) {
            alert("创建成功");
            window.location.href = "edit.html";
          }
          return false;
        });
        $("#button-delete").click(function() {
          if (deleteCourse()) {
            window.location.href = "edit.html";
            alert("删除成功");
          }
          else {
            alert("该课程不存在");
          }
          return false;
        });
        $("#button-remax").click(function() {
          if (remaxCourse()) {
            window.location.href = "edit.html";
            alert("修改成功");
          }
          else {
            alert("修改失败");
          }
          return false;
        });
        $("#button-rename").click(function() {
          if (renameCourse()) {
            window.location.href = "edit.html";
            alert("修改成功");
          }
          else {
            alert("修改失败");
          }
          return false;
        });
        $("#button-find").click(function() {
          if (findCourse()) {
            // window.location.href = "edit.html";
            alert("查询成功");
            changename();
          }
          else {
            alert("该课程不存在");
          }
          return false;
        });
        $("#button-add").click(function() {
        //  showallcourses();
        });
    });
}
