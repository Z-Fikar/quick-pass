if (window == window.top) {
  // location.href = "/quickpass"
}

window.onload = function() {
  var check_profil = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
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

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonanDetail();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
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

    console.log(data_permohonanDetail);
    var data = data_permohonanDetail.filter(function(item) {
      return item.HeaderID == elem.value;
    });
    console.log(data);

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

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonanHeader();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
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

  var save_permohonan = function(){
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "save_permohonan();",
      HeaderID: document.getElementById("sbJenisPermohonan").value,
      DetailID: document.getElementById("sbDetailPermohonan").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        var galat = document.getElementById("lblGalat");
        while(galat.firstChild){
          galat.removeChild(galat.firstChild);
        }
        if (data.SuccessMessage) {
          alert(data.InfoMessage);
          location.href = "pembuatan.html";
        }else{
          var text = document.createTextNode(data.InfoMessage);
          galat.appendChild(text);
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  document.getElementById("btnBuat").onclick = function(){
    var tmp = document.getElementById("sbDetailPermohonan").value;
    if(tmp){
      save_permohonan();
    }else{
      var galat = document.getElementById("lblGalat");
      while(galat.firstChild){
        galat.removeChild(galat.firstChild);
      }
      var text = document.createTextNode("Lengkapi data lebih dulu!");
      galat.appendChild(text);
    }
  }

  var get_permohonan = function(){
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonan();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var d = data.List;
          document.getElementById("txtJenisPermohonan").value = d.Header;
          document.getElementById("txtDetailPermohonan").value = d.Detail;
          document.getElementById("contBuat").style.display = "none";
          var img = document.querySelectorAll(".circle");
          for(i=0;i<d.Status;i++){
            img[i].classList.add("circle-checked");
          }
          var arr = document.querySelectorAll(".arrow");
          for(i=0;i<d.Status && i<4;i++){
            arr[i].classList.add("arrow-checked");
          }
        }else{
          document.getElementById("contDetail").style.display = "none";
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonan();

  var delete_permohonan = function(){
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "delete_permohonan();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        alert(data.InfoMessage);
        if(data.SuccessMessage){
          location.href = "pembuatan.html";
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  document.getElementById("btnBatal").onclick = function(){
    if(confirm("Permohonan akan dibatalkan?\nTekan OK untuk melanjutkan")){
      delete_permohonan();
    }
  };

  var acc = document.querySelector("#contDetail .accordion");
  acc.classList.toggle("active");
  var panel = acc.nextElementSibling;
  panel.style.height = "auto";
  panel.style.padding = "15px 18px";


};
