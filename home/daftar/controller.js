window.onload = function() {
  var l = document.querySelector(".overlay");
  // db - done

  var reportError = function(m) {
    var galat = document.getElementById("lblGalat");
    galat.innerHTML = m;
  };
  var save_akun = function() {
    var ks = document.getElementById("txtKataSandi");
    var ks1 = document.getElementById("txtKataSandi1");
    var sama = ks.value == ks1.value;

    var err_str = "";
    if (!sama) {
      err_str += "Kata sandi tidak sama";
    }
    
    var inputs = document.querySelectorAll("input");
    var valid = true;
    for (i = 0; i < inputs.length; i++) {
      if (inputs[i].validationMessage != "") {
        inputs[i].reportValidity();
        valid = false;
        break;
      }
    }

    if (valid && sama) {
      l.style.display = "block";
      if (window.XMLHttpRequest) {
        var hr = new XMLHttpRequest();
      } else {
        var hr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      var url = "/webservices.php";
      hr.open("POST", url, true);
      var params = {
        method: "save_akun();",
        AlamatEmail: document.getElementById("txtAlamatEmail").value,
        KataSandi: ks.value
      };
      hr.onreadystatechange = function() {
        if (hr.readyState == 4 && hr.status == 200) {
          console.log(hr);
          var data = JSON.parse(hr.response);
          l.style.display = "none";
          if (data.SuccessMessage) {
            alert(data.InfoMessage);
            location.href = "/";
          }
          reportError(d.InfoMessage);
        }
      };
      hr.setRequestHeader("Content-type", "application/json");
      hr.send(JSON.stringify(params));
    } else {
      reportError(err_str);
    }
  };

  var submit = document.getElementById("btnDaftar");
  submit.onclick = function() {
    save_akun();
  };
};
