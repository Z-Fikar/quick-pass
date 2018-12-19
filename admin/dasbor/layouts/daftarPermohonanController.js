if (window == window.top) {
  location.href = "/quickpass";
}

window.onload = function() {
  var getAll_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "getAll_permohonan();"
    };
    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var d = data.List;
          var head = [
            "TanggalPermohonan",
            "NamaLengkap",
            "JenisPermohonan",
            "ID"
          ];
          var tbody = document.querySelector(".col table tbody");
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
        } else {
          alert(data.InfoMessage);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  getAll_permohonan();
};
