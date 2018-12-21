var check_login = function() {
  if (window.XMLHttpRequest) {
    var hr = new XMLHttpRequest();
  } else {
    var hr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "/webservices.php";
  hr.open("POST", url, true);
  var params = {
    method: "check_login();"
  };

  hr.onreadystatechange = function() {
    if (hr.readyState == 4 && hr.status == 200) {
      console.log(hr);
      var data = JSON.parse(hr.response);
      if (data.SuccessMessage) {
        location.href = "/";
      }
    }
  };

  hr.setRequestHeader("Content-type", "application/json");
  hr.send(JSON.stringify(params));
};
check_login();

window.onload = function() {
  var do_login = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "do_login();",
      AlamatEmail: document.getElementById("txtAlamatEmail").value,
      KataSandi: document.getElementById("txtKataSandi").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          location.href = "/quickpass";
        }

        var galat = document.getElementById("lblGalat");
        while (galat.firstChild) {
          galat.removeChild(galat.firstChild);
        }
        var text = document.createTextNode(data.InfoMessage);
        galat.appendChild(text);
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  var masuk = document.getElementById("btnMasuk");
  masuk.onclick = function() {
    do_login();
  };

  var daftar = document.getElementById("btnDaftar");
  daftar.onclick = function() {
    location.href = "/home/daftar";
  };
};
