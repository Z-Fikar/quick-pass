if (window == window.top) {
  location.href = "/";
}

window.onload = function() {
  var list = [];
  var generateTable = function(d) {
    var head = [
      "ID",
      "TanggalPermohonan",
      "NamaLengkap",
      "JenisPermohonan",
      "Status",
      "ID"
    ];
    var tbody = document.querySelector(".col table tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (i = 0; i < d.length; i++) {
      var tr = document.createElement("TR");
      for (j = 0; j < head.length; j++) {
        var td = document.createElement("TD");
        if (j < head.length - 1) {
          var txt = document.createTextNode(d[i][head[j]]);
          td.appendChild(txt);
        } else {
          var btn = document.createElement("BUTTON");
          var txt = document.createTextNode("SUNTING");
          btn.appendChild(txt);
          btn.data = d[i][head[j]];
          btn.classList.add("btn-border");
          btn.onclick = function() {
            location.href = "detail-permohonan.html?id=" + this.data;
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
          list = data.List;
          generateTable(list);
        } else {
          alert(data.InfoMessage);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  getAll_permohonan();

  var cariPermohonan = function(str) {
    var res = list.filter(function(item) {
      console.log(item.NamaLengkap.indexOf(str));
      return (
        item.NamaLengkap.toLowerCase().indexOf(str.toLowerCase()) >= 0 ||
        item.TanggalPermohonan.toLowerCase().indexOf(str.toLowerCase()) >= 0 ||
        item.JenisPermohonan.toLowerCase().indexOf(str.toLowerCase()) >= 0 ||
        item.ID.toLowerCase().indexOf(str.toLowerCase()) >= 0
      );
    });
    generateTable(res);
  };

  var cari = document.getElementById("btnCari");
  cari.onclick = function() {
    var str = document.getElementById("txtCari").value;
    cariPermohonan(str);
  };
};
