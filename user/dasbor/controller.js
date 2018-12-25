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
      if (!data.SuccessMessage) {
        location.href = "/";
      }
    }
  };

  hr.setRequestHeader("Content-type", "application/json");
  hr.send(JSON.stringify(params));
};
check_login();

window.onload = function() {
  var changeActive = function(e) {
    if (!e.classList.contains("active")) {
      tmp = document.querySelector(".sidemenu .active");
      if (tmp) {
        tmp.classList.remove("active");
      }
      e.classList.add("active");
    }
  };

  var li = document.querySelectorAll(".sidemenu li");
  for (var i = 0; i < li.length; i++) {
    li[i].onclick = function() {
      changeActive(this);
    };
  }

  var theModal = document.querySelector(".modal-account");
  var closeModal = function() {
    if (!theModal.classList.contains("modal-hide")) {
      theModal.classList.toggle("modal-hide");
    }
  };

  var btnModal = document.querySelector("#btnAccount");

  window.onclick = function(e) {
    if (btnModal.contains(e.target)) {
      theModal.classList.toggle("modal-hide");
    } else if (!theModal.contains(e.target)) {
      closeModal();
    }
  };

  var f = document.querySelector("iframe");
  f.contentWindow.onclick = function() {
    closeModal();
  };
  f.onload = function() {
    var href = this.contentWindow.location.href;
    var a = document.querySelectorAll(".sidemenu a");
    for (var i = 0; i < a.length; i++) {
      if (href == a[i].href) {
        changeActive(a[i].childNodes[0]);
        break;
      }
    }
    f.contentWindow.onclick = function() {
      closeModal();
    };
  };

  var liMenu = document.querySelectorAll(".menu li");
  for (var i = 0; i < liMenu.length; i++) {
    liMenu[i].onclick = function() {
      tmp = document.querySelector(".sidemenu .active");
      if(tmp){
        tmp.classList.remove("active");
      }
    };
  }

  var do_logout = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "do_logout();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          location.href = "/";
        } else {
          alert(data.InfoMessage);
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var keluar = document.getElementById("btnKeluar");
  var prev_handler = keluar.onclick;
  keluar.onclick = function() {
    var f = document.querySelector("iframe");
    f.contentWindow.document.querySelector(".overlay").style.display = "block";
    prev_handler();
    do_logout();
  };

  var get_profil = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_profil();"
    };
    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var d = data.List;
          var namaLengkap = document.getElementById("lblNamaLengkap");
          if(d.NamaLengkap == ""){
            d.NamaLengkap = "Lengkapi Profil dulu ya"
          }
          namaLengkap.appendChild(document.createTextNode(d.NamaLengkap));
        } else {
          alert(data.InfoMessage);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_profil();
};
