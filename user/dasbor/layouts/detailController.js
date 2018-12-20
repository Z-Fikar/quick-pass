if (window == window.top) {
  // location.href = "/quickpass"
}

window.onload = function() {
  var url_str = window.location.href;
  var id = new URL(url_str).searchParams.get("id");

  var get_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_permohonan();",
      PermohonanID: id
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var d = data.List;
          document.getElementById("txtJenisPermohonan").value = d.Header;
          document.getElementById("txtDetailPermohonan").value = d.Detail;
          document.getElementById("txtCatatan").value = d.Catatan;

          var img = document.querySelectorAll(".circle");
          for (i = 0; i < d.Status && i < 5; i++) {
            img[i].classList.add("circle-checked");
          }
          var arr = document.querySelectorAll(".arrow");
          for (i = 0; i < d.Status && i < 4; i++) {
            arr[i].classList.add("arrow-checked");
          }

          if (d.Status > 4) {
            document.getElementById("btnBatal").style.display = "none";
          }

          if (d.Status == 7) {
            var circle = document.querySelectorAll(".circle");
            for (i = 0; i < circle.length; i++) {
              circle[i].style.display = "none";
            }

            var arrow = document.querySelectorAll(".arrow");
            for (i = 0; i < arrow.length; i++) {
              arrow[i].style.display = "none";
            }
          } else {
            var back = document.querySelector(".circle-back");
            back.style.display = "none";
          }
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonan();

  var delete_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "delete_permohonan();",
      id: id
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        alert(data.InfoMessage);
        if (data.SuccessMessage) {
          location.href = "pembuatan.html";
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  document.getElementById("btnBatal").onclick = function() {
    if (confirm("Permohonan akan dibatalkan?\nTekan OK untuk melanjutkan")) {
      delete_permohonan();
    }
  };
  document.getElementById("btnKembali").onclick = function() {
    window.history.back();
  };
};
