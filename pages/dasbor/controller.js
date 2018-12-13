var check_login = function() {
  if (window.XMLHttpRequest) {
    var hr = new XMLHttpRequest();
  } else {
    var hr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "/quickpass/webservices.php";
  hr.open("POST", url, true);
  var params = {
    method: "check_login();"
  };

  hr.onreadystatechange = function() {
    if (hr.readyState == 4 && hr.status == 200) {
      console.log(hr);
      var data = JSON.parse(hr.response);
      if (!data.SuccessMessage) {
        location.href = "/quickpass";
      }
    }
  };

  hr.setRequestHeader("Content-type", "application/json");
  hr.send(JSON.stringify(params));
};
check_login();