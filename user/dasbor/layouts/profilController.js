if (window == window.top) {
  // location.href = "/";
}

window.onload = function() {
  var l = document.querySelector(".overlay");
  var change_pekerjaan = function(element) {
    input = document.getElementById("txtPekerjaan");
    input.value = element.options[element.selectedIndex].text;

    list = input.classList;
    if (element.value == 5) {
      input.style.display = "";
      input.value = "";
    } else {
      input.style.display = "none";
      input.value = element.options[element.selectedIndex].text;
    }
  };

  // db
  var get_pekerjaan = function() {
    l.style.display = "block";
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_pekerjaan();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        l.style.display = "none";
        if (data.SuccessMessage) {
          var select = document.getElementById("sbPekerjaan");
          select.onchange = function() {
            change_pekerjaan(this);
          };
          data.List.forEach(element => {
            var option = document.createElement("OPTION");
            var text = document.createTextNode(element.Nama);
            option.appendChild(text);
            option.setAttribute("value", element.ID);
            select.appendChild(option);
          });
          select.selectedIndex = 4;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  var showPasangan = function(sb) {
    var p = document.getElementById("pPasangan");
    if (sb.selectedIndex == 1 || sb.selectedIndex == -1) {
      p.style.display = "none";
      var inputs = document.querySelectorAll("#pPasangan input");
      for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    } else {
      p.style.display = "block";
    }
  };

  // db
  var get_statusSipil = function() {
    l.style.display = "block";
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_statusSipil();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        l.style.display = "none";
        if (data.SuccessMessage) {
          var select = document.getElementById("sbStatusSipil");
          data.List.forEach(element => {
            var option = document.createElement("OPTION");
            var text = document.createTextNode(element.Nama);
            option.appendChild(text);
            option.setAttribute("value", element.ID);
            select.appendChild(option);
          });
          select.selectedIndex = 1;
          select.onchange = function() {
            showPasangan(this);
          };
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  // db
  var update_profil = function() {
    l.style.display = "block";
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "update_profil();",
      NamaLengkap: document.getElementById("txtNamaLengkap").value,
      JenisKelamin: document.querySelector("input[name='jenisKelamin']:checked")
        .value,
      NamaLain: document.getElementById("txtNamaLain").value,
      TinggiBadan: +document.getElementById("txtTinggiBadan").value,
      TempatLahir: document.getElementById("txtTempatLahir").value,
      TanggalLahir: document.getElementById("txtTanggalLahir").value,
      NomorKTPWNI: document.getElementById("txtNomorKTPWNI").value,
      TanggalDikeluarkan: document.getElementById("txtTanggalDikeluarkan")
        .value,
      TempatDikeluarkan: document.getElementById("txtTempatDikeluarkan").value,
      TanggalBerakhir: document.getElementById("txtTanggalBerakhir").value,
      Alamat: document.getElementById("txtAlamat").value,
      Telepon: document.getElementById("txtTelepon").value,
      StatusSipilID: document.getElementById("sbStatusSipil").value,
      PekerjaanID: document.getElementById("sbPekerjaan").value,
      Pekerjaan: document.getElementById("txtPekerjaan").value,
      NamaAlamatKantor: document.getElementById("txtNamaAlamatKantor").value,
      TeleponKantor: document.getElementById("txtTeleponKantor").value,
      NamaIbu: document.getElementById("txtNamaIbu").value,
      KewarganegaraanIbu: document.getElementById("txtKewarganegaraanIbu")
        .value,
      TempatLahirIbu: document.getElementById("txtTempatLahirIbu").value,
      TanggalLahirIbu: document.getElementById("txtTanggalLahirIbu").value,
      NamaAyah: document.getElementById("txtNamaAyah").value,
      KewarganegaraanAyah: document.getElementById("txtKewarganegaraanAyah")
        .value,
      TempatLahirAyah: document.getElementById("txtTempatLahirAyah").value,
      TanggalLahirAyah: document.getElementById("txtTanggalLahirAyah").value,
      AlamatOrangTua: document.getElementById("txtAlamatOrangTua").value,
      TeleponOrangTua: document.getElementById("txtTeleponOrangtua").value,
      NamaPasangan: document.getElementById("txtNamaPasangan").value,
      KewarganegaraanPasangan: document.getElementById(
        "txtKewarganegaraanPasangan"
      ).value,
      TempatLahirPasangan: document.getElementById("txtTempatLahirPasangan")
        .value,
      TanggalLahirPasangan: document.getElementById("txtTanggalLahirPasangan")
        .value
    };
    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
        l.style.display = "none";
        if (data.SuccessMessage) {
          alert(data.InfoMessage);
          parent.location.href = "/";
        } else {
          var galat = document.getElementById("lblGalat");
          while (galat.firstChild) {
            galat.removeChild(galat.firstChild);
          }
          var text = document.createTextNode(data.InfoMessage);
          galat.appendChild(text);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  // db
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
        var data = JSON.parse(hr.response);
        l.style.display = "none";
        if (data.SuccessMessage) {
          d = data.List;
          document.getElementById("txtNamaLengkap").value = d.NamaLengkap;
          document.querySelector(
            "input[value='" + d.JenisKelamin + "']"
          ).checked = true;
          document.getElementById("txtNamaLain").value = d.NamaLain;
          document.getElementById("txtTinggiBadan").value = d.TinggiBadan;
          document.getElementById("txtTempatLahir").value = d.TempatLahir;
          document.getElementById("txtTanggalLahir").value = d.TanggalLahir;
          document.getElementById("txtNomorKTPWNI").value = d.NomorKTPWNI;
          document.getElementById("txtTanggalDikeluarkan").value =
            d.TanggalDikeluarkan;
          document.getElementById("txtTempatDikeluarkan").value =
            d.TempatDikeluarkan;
          document.getElementById("txtTanggalBerakhir").value =
            d.TanggalBerakhir;
          document.getElementById("txtAlamat").value = d.Alamat;
          document.getElementById("txtTelepon").value = d.Telepon;
          document.getElementById("sbStatusSipil").value = d.StatusSipilID;
          showPasangan(document.getElementById("sbStatusSipil"));
          document.getElementById("sbPekerjaan").value = d.PekerjaanID;
          document.getElementById("txtPekerjaan").value = d.Pekerjaan;
          document.getElementById("txtNamaAlamatKantor").value =
            d.NamaAlamatKantor;
          document.getElementById("txtTeleponKantor").value = d.TeleponKantor;

          document.getElementById("txtNamaIbu").value = d.NamaIbu;
          document.getElementById("txtKewarganegaraanIbu").value =
            d.KewarganegaraanIbu;
          document.getElementById("txtTempatLahirIbu").value = d.TempatLahirIbu;
          document.getElementById("txtTanggalLahirIbu").value =
            d.TanggalLahirIbu;

          document.getElementById("txtNamaAyah").value = d.NamaAyah;
          document.getElementById("txtKewarganegaraanAyah").value =
            d.KewarganegaraanAyah;
          document.getElementById("txtTempatLahirAyah").value =
            d.TempatLahirAyah;
          document.getElementById("txtTanggalLahirAyah").value =
            d.TanggalLahirAyah;

          document.getElementById("txtAlamatOrangTua").value = d.AlamatOrangTua;
          document.getElementById("txtTeleponOrangtua").value =
            d.TeleponOrangTua;

          document.getElementById("txtNamaPasangan").value = d.NamaPasangan;
          document.getElementById("txtKewarganegaraanPasangan").value =
            d.KewarganegaraanPasangan;
          document.getElementById("txtTempatLahirPasangan").value =
            d.TempatLahirPasangan;
          document.getElementById("txtTanggalLahirPasangan").value =
            d.TanggalLahirPasangan;
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
    update_profil();
  };

  var inputDates = document.getElementsByClassName("date");
  for (i = 0; i < inputDates.length; i++) {
    inputDates[i].onkeypress = function() {
      if (check_date(this.value)) {
        this.setCustomValidity("");
      } else {
        this.setCustomValidity("Cek formatnya: bb hh tttt");
      }
    };
  }

  get_statusSipil();
  get_pekerjaan();
  get_profil();
};
