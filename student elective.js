//localStorage.clear();
//alert(document.cookie);
function showname() {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for(var i = 0; i<arrCookie.length; i++){
      var arr = arrCookie[i].split("=");
       if(" currentname" == arr[0]){    //应该多一个空格！！
        var currentname1 = arr[1];
      }
    }
    //alert(currentname1);
    // document.getElementById("currentcourse").innerHTML = "currentcourse1";
    $('#currentname').text(currentname1);
}

function showcourse() {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i = 0; i<arrCookie.length; i++){
    var arr = arrCookie[i].split("=");
     if(" currentname" == arr[0]){    //应该多一个空格！！
      var currentname1 = arr[1];
    }
  }
  var coursesJson = localStorage.courses;
  if(coursesJson == null) {
    alert("教务并未添加任何课程。")
    return false;
  }
  var courses = JSON.parse(coursesJson);
  var stuselectsJson = localStorage.stuselects;
  if(stuselectsJson == null) return false;
  var stuselects = JSON.parse(stuselectsJson);
  var resultTableHtml = '';
  var count = 0;
  var condition = 'a';
  for(var j = 0; j<courses.length; ++j) {
    count++;
    var mark = 0;
    for(var i = 0; i<stuselects.length; ++i) {
      if(stuselects[i].coursename == courses[j].coursename
        && stuselects[i].studentname == currentname1) {
        condition = '<span class="tag is-success">已选</span>';
        mark = 1;
        resultTableHtml += '<tr><td>'+count+'</td><td>'+courses[j].coursename+'</td><td>'+courses[j].leftperson+'</td><td>'+courses[j].maxperson+'</td><td>'+condition+'</td></tr>';
        break;
      }
    }
    if(mark == 0) {
      condition = '<div id="success"><span class="tag is-danger" id="fail">未选</span></div>';
      resultTableHtml += '<tr><td>'+count+'</td><td>'+courses[j].coursename+'</td><td>'+courses[j].leftperson+'</td><td>'+courses[j].maxperson+'</td><td>'+condition+'</td></tr>';
    }

  }
  //resultTableHtml = '';
  $('#resultTable').html(resultTableHtml);
  resultTableHtml = '';
  //window.location.href = "elective.html";
}

function toselect() {
  //alert(document.cookie);
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for(var i = 0; i<arrCookie.length; i++){
      var arr = arrCookie[i].split("=");
       if(" currentname" == arr[0]){    //应该多一个空格！！
        var currentname1 = arr[1];
      }
    }
  //alert("wowo"+currentname1);
  var selectcourse = $("#coursename1").val();
  var coursesJson = localStorage.courses;
  //alert(coursesJson);
  if(coursesJson == null)  {
    alert("系统中尚未存在课程。");
    return false;
  }
  var courses = JSON.parse(coursesJson);

  //currentname1 = "123";
  var stuselectsJson = localStorage.stuselects;
  if (stuselectsJson == null) {
    stuselectsJson = "[]";
    var stuselects = JSON.parse(stuselectsJson);
    var stuselect = {
      studentname: currentname1,    //没法定义？？？？？？？
      coursename: selectcourse
    };
    var flag = 0;
    var mark = 0;
    for(var j = 0; j<courses.length; ++j) {
      if(selectcourse == courses[j].coursename) {
        flag = 1;
        mark = j;
      }
    }
    if(flag == 0) {
      alert("该课程尚未开设。");
      return false;
    }
    else {
      if(courses[mark].leftperson>=1) {
        courses[mark].leftperson --;
        stuselects.push(stuselect);
        localStorage.stuselects = JSON.stringify(stuselects);
        localStorage.courses = JSON.stringify(courses);
        //window.location.href = "elective.html";
        return true;
      }
      else {
        alert("该课程已达人数上限。")
        return false;
      }
    }
  }
  //////分别处理是否有stuselect因为它可能没有length
  else {
    var stuselects = JSON.parse(stuselectsJson);
    //alert(stuselectsJson);
    var flag = 0;
    var mark = 0;
    for(var j = 0; j<courses.length; ++j) {
      if(selectcourse == courses[j].coursename) {
        flag = 1;
        mark = j;
      }
    }
    if(flag == 0) {
      alert("该课程尚未开设。");
      return false;
    }
    else {
      //alert(currentname1);
      //alert(selectcourse);
      //alert(stuselectsJson);
      ///////下面这个循环没有走？？
      var temp = 0;
      for (var p = 0; p < stuselects.length; ++p) {
        if (stuselects[p].studentname == currentname1 && stuselects[p].coursename == selectcourse) {
          temp = 1;
        }
      }
      if(temp == 1) {
        alert("该课程已选择。");
        return false;
      }
      else {
        if(courses[mark].leftperson>=1) {
          courses[mark].leftperson --;
          var stuselect = {
            studentname: currentname1,    //没法定义？？？？？？？
            coursename: selectcourse
          };
          //stuselects.push("aa");
          stuselects.push(stuselect);

          localStorage.stuselects = JSON.stringify(stuselects);
          localStorage.courses = JSON.stringify(courses);
          //alert(stuselectsJson);
          return true;
        }
        else {
          alert("该课程已达人数上限。")
          return false;
        }
      }
    }

  }

  //return true;
}

function todrop() {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for(var i = 0; i<arrCookie.length; i++){
    var arr = arrCookie[i].split("=");
    if(" currentname" == arr[0]){    //应该多一个空格！！
      var currentname1 = arr[1];
    }
  }
  var selectcourse = $("#coursename2").val();
  var stuselectsJson = localStorage.stuselects;
  if(stuselectsJson == null){
    alert("您尚未选课。");
    return false;
  }
  //alert(stuselectsJson);
  var stuselects = JSON.parse(stuselectsJson);
  var coursesJson = localStorage.courses;
  if(coursesJson == null) {
    alert("教务并未添加任何课程。");
    return false;
  }
  //alert(coursesJson);
  var courses = JSON.parse(coursesJson);
  var mark = 0;
  for(var j = 0; j<courses.length; ++j) {
    if(selectcourse == courses[j].coursename) {
      mark = j;
      break;
    }
  }
  var flag = 0;
  for (var i = 0; i < stuselects.length; ++i) {
    if (stuselects[i].studentname == currentname1
      && stuselects[i].coursename == selectcourse) {
        flag = 1;
        var mark2 = i;
    }
  }
  if(flag == 1) {
    stuselects.splice(mark2,1);
    courses[mark].leftperson ++;
  //alert(stuselectsJson);
    localStorage.stuselects = JSON.stringify(stuselects);
    localStorage.courses = JSON.stringify(courses);
    return true;
  }
  else {
    alert("未添加该课程。");
    return false;
  }
}

window.onload = function() {
    $(document).ready(function() {
      showname();
      showcourse();
        $("#button-toselect").click(function() {
          if (toselect()) {
            showcourse();
            alert("选课成功。")
            //window.location.href = "elective.html";
          }
          else {
            alert("选课失败。")
          }
          return false;
        });
        $("#button-todrop").click(function() {
          if (todrop()) {
            alert("成功删除课程。")
            showcourse();
            //window.location.href = "elective.html";
          }
          else {
            alert("删除失败。")
          }
          return false;
        });
    });
}
