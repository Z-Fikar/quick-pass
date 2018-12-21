if (window == window.top) {
  // location.href = "/"
}

window.onload = function() {
  var check_profil = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "check_profil();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        var label = document.getElementById("lblCekProfil");
        while (label.firstChild) {
          label.removeChild(label.firstChild);
        }
        if (!data.SuccessMessage) {
          alert("Data Profil harap dilengkapi");
          location.href = "profil.html";
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  check_profil();

  var data_permohonanDetail = [];
  var get_permohonanDetail = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonanDetail();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          data_permohonanDetail = data.List;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonanDetail();

  var change_sbPermohonanDetail = function(elem) {
    var select = document.getElementById("sbDetailPermohonan");
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    var data = data_permohonanDetail.filter(function(item) {
      return item.HeaderID == elem.value;
    });

    data.forEach(function(element) {
      var option = document.createElement("OPTION");
      var text = document.createTextNode(element.Nama);
      option.appendChild(text);
      option.setAttribute("value", element.ID);
      select.appendChild(option);
    });
  };

  var get_permohonanHeader = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonanHeader();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var select = document.getElementById("sbJenisPermohonan");
          select.onclick = function() {
            change_sbPermohonanDetail(this);
          };
          var option = document.createElement("OPTION");
          var text = document.createTextNode("");
          option.appendChild(text);
          option.setAttribute("value", 0);
          select.appendChild(option);
          data.List.forEach(element => {
            var option = document.createElement("OPTION");
            var text = document.createTextNode(element.Nama);
            option.appendChild(text);
            option.setAttribute("value", element.ID);
            select.appendChild(option);
          });
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonanHeader();

  var save_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "save_permohonan();",
      HeaderID: document.getElementById("sbJenisPermohonan").value,
      DetailID: document.getElementById("sbDetailPermohonan").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        var galat = document.getElementById("lblGalat");
        while (galat.firstChild) {
          galat.removeChild(galat.firstChild);
        }
        if (data.SuccessMessage) {
          alert(data.InfoMessage);
          location.href = "pembuatan.html";
        } else {
          var text = document.createTextNode(data.InfoMessage);
          galat.appendChild(text);
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  document.getElementById("btnBuat").onclick = function() {
    var tmp = document.getElementById("sbDetailPermohonan").value;
    if (tmp) {
      save_permohonan();
    } else {
      var galat = document.getElementById("lblGalat");
      while (galat.firstChild) {
        galat.removeChild(galat.firstChild);
      }
      var text = document.createTextNode("Lengkapi data lebih dulu!");
      galat.appendChild(text);
    }
  };

  var permohonan = [];
  var generateTable = function() {
    var d = permohonan;
    var tbody = document.querySelector("#contTable table tbody");
    var head = ["ID", "TanggalPermohonan", "JenisPermohonan", "Status", "ID"];
    for (i = 0; i < d.length; i++) {
      var tr = document.createElement("TR");
      for (j = 0; j < head.length; j++) {
        var td = document.createElement("TD");
        if (j < head.length - 1) {
          var txt = document.createTextNode(d[i][head[j]]);
          td.appendChild(txt);
        } else {
          var btn = document.createElement("BUTTON");
          var txt = document.createTextNode("DETAIL");
          btn.appendChild(txt);
          btn.data = d[i][head[j]];
          btn.classList.add("btn-border");
          btn.onclick = function() {
            location.href = "detail.html?id=" + this.data;
          };
          td.appendChild(btn);
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  };
  var getAll_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "getAll_permohonan();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          permohonan = data.List;
          generateTable();
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  getAll_permohonan();
};
