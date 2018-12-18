if (window == window.top) {
  // location.href = "/quickpass"
}

window.onload = function() {
  var update_akun = function() {
    var inputDates = document.getElementsByClassName("date");
    var allTrue = Object.keys(inputDates).every(function(k) {
      return (
        check_date(inputDates[k].value) === true || inputDates[k].value === ""
      );
    });
    if (
      document.getElementById("txtKataSandi").value ==
        document.getElementById("txtKataSandi1").value &&
      allTrue
    ) {
      if (window.XMLHttpRequest) {
        var hr = new XMLHttpRequest();
      } else {
        var hr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      var url = "/quickpass/webservices.php";
      hr.open("POST", url, true);
      var params = {
        method: "update_akun();",
        AlamatEmail: document.getElementById("txtAlamatEmail").value,
        KataSandi: document.getElementById("txtKataSandi").value
      };
      hr.onreadystatechange = function() {
        if (hr.readyState == 4 && hr.status == 200) {
          console.log(hr);
          var data = JSON.parse(hr.response);
          if (data.SuccessMessage) {
            alert(data.InfoMessage);
            location.href = "index.html";
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
    } else {
      alert("Kata Sandi belum sama!");
      document.getElementById("txtKataSandi").focus();
    }
  };

  var get_akun = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_akun();"
    };
    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          d = data.List;
          document.getElementById("txtAlamatEmail").value = d.AlamatEmail;
        } else {
          alert(data.InfoMessage);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  var submit = document.getElementById("btnSimpan");
  submit.onclick = function() {
    update_akun();
  };

  get_akun();
};
