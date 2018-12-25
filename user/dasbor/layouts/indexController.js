if (window == window.top) {
  location.href = "/quickpass";
}

window.onload = function() {
  var l = document.querySelector(".overlay");
  var get_profil = function() {
    l.style.display = "block";
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
        l.style.display = "none";
        if (data.SuccessMessage) {
          var d = data.List;
          var namaLengkap = document.getElementById("lblNamaLengkap");
          if (d.NamaLengkap == "" || d.NamaLengkap == null) {
            d.NamaLengkap = "silahkan lengkapi data Profil anda di sini.";
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
