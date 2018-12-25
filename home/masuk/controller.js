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
  var l = document.querySelector(".overlay");
  var reportError = function(m) {
    var galat = document.getElementById("lblGalat");
    while (galat.firstChild) {
      galat.removeChild(galat.firstChild);
    }
    var text = document.createTextNode(m);
    galat.appendChild(text);
  };

  var do_login = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    l.style.display = "block";

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "do_login();",
      AlamatEmail: document.getElementById("txtAlamatEmail").value,
      KataSandi: document.getElementById("txtKataSandi").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          location.href = "/";
        } else {
          reportError(data.InfoMessage);
          l.style.display = "none";
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  var masuk = document.getElementById("btnMasuk");
  masuk.onclick = function() {
    var mail = document.getElementById("txtAlamatEmail");
    var pass = document.getElementById("txtKataSandi");
    if (mail.value.length && pass.value.length) {
      do_login();
    } else {
      reportError("Harap untuk melengkapi masukkan");
    }
  };

  var daftar = document.getElementById("btnDaftar");
  daftar.onclick = function() {
    location.href = "/home/daftar";
  };
};
