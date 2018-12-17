if(window==window.top){
  location.href = "/quickpass"
}

window.onload = function() {
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

  var get_pekerjaan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_pekerjaan();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
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

  var get_statusSipil = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_statusSipil();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        var data = JSON.parse(hr.response);
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
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  var change_date = function(str_date) {
    var list_date = str_date.split(" ");
    var str_date = list_date.reverse().join("-");
    return new Date(str_date);
  };

  var check_date = function(str_date) {
    var list_date = str_date.split(" ");
    var str_date = [list_date[1], list_date[0], list_date[2]].join(" ");
    var the_date = new Date(str_date);
    if (the_date) {
      if (
        +list_date[0] == the_date.getDate() &&
        +list_date[1] == the_date.getMonth() + 1 &&
        +list_date[2] == the_date.getFullYear()
      ) {
        return true;
      }
    }
    return false;
  };

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
        KataSandi: document.getElementById("txtKataSandi").value,
        NamaLengkap: document.getElementById("txtNamaLengkap").value,
        JenisKelamin: document.querySelector(
          "input[name='jenisKelamin']:checked"
        ).value,
        NamaLain: document.getElementById("txtNamaLain").value,
        TinggiBadan: +document.getElementById("txtTinggiBadan").value,
        TempatLahir: document.getElementById("txtTempatLahir").value,
        TanggalLahir: change_date(
          document.getElementById("txtTanggalLahir").value
        ),
        NomorKTPWNI: document.getElementById("txtNomorKTPWNI").value,
        TanggalDikeluarkan: change_date(
          document.getElementById("txtTanggalDikeluarkan").value
        ),
        TempatDikeluarkan: document.getElementById("txtTempatDikeluarkan")
          .value,
        TanggalBerakhir: change_date(
          document.getElementById("txtTanggalBerakhir").value
        ),
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
        TanggalLahirIbu: change_date(
          document.getElementById("txtTanggalLahirIbu").value
        ),
        NamaAyah: document.getElementById("txtNamaAyah").value,
        KewarganegaraanAyah: document.getElementById("txtKewarganegaraanAyah")
          .value,
        TempatLahirAyah: document.getElementById("txtTempatLahirAyah").value,
        TanggalLahirAyah: change_date(
          document.getElementById("txtTanggalLahirAyah").value
        ),
        AlamatOrangTua: document.getElementById("txtAlamatOrangTua").value,
        TeleponOrangTua: document.getElementById("txtTeleponOrangtua").value,
        NamaPasangan: document.getElementById("txtNamaPasangan").value,
        KewarganegaraanPasangan: document.getElementById(
          "txtKewarganegaraanPasangan"
        ).value,
        TempatLahirPasangan: document.getElementById("txtTempatLahirPasangan")
          .value,
        TanggalLahirPasangan: change_date(
          document.getElementById("txtTanggalLahirPasangan").value
        )
      };
      hr.onreadystatechange = function() {
        if (hr.readyState == 4 && hr.status == 200) {
          console.log(hr);
          var data = JSON.parse(hr.response);
          if (data.SuccessMessage) {
            alert(data.InfoMessage);
            location.href = "profil.html";
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

  var change_date_format = function(str_date) {
    var date = str_date.split("-");
    return date.reverse().join(" ");
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
          document.getElementById("txtNamaLengkap").value = d.NamaLengkap;
          document.querySelector(
            "input[value='" + d.JenisKelamin + "']"
          ).checked = true;
          document.getElementById("txtNamaLain").value = d.NamaLain;
          document.getElementById("txtTinggiBadan").value = d.TinggiBadan;
          document.getElementById("txtTempatLahir").value = d.TempatLahir;
          document.getElementById("txtTanggalLahir").value = change_date_format(
            d.TanggalLahir
          );
          document.getElementById("txtNomorKTPWNI").value = d.NomorKTPWNI;
          document.getElementById(
            "txtTanggalDikeluarkan"
          ).value = change_date_format(d.TanggalDikeluarkan);
          document.getElementById("txtTempatDikeluarkan").value =
            d.TempatDikeluarkan;
          document.getElementById(
            "txtTanggalBerakhir"
          ).value = change_date_format(d.TanggalBerakhir);
          document.getElementById("txtAlamat").value = d.Alamat;
          document.getElementById("txtTelepon").value = d.Telepon;
          document.getElementById("sbStatusSipil").value = d.StatusSipilID;
          document.getElementById("sbPekerjaan").value = d.PekerjaanID;
          document.getElementById("txtPekerjaan").value = d.Pekerjaan;
          document.getElementById("txtNamaAlamatKantor").value =
            d.NamaAlamatKantor;
          document.getElementById("txtTeleponKantor").value = d.TeleponKantor;

          document.getElementById("txtNamaIbu").value = d.NamaIbu;
          document.getElementById("txtKewarganegaraanIbu").value =
            d.KewarganegaraanIbu;
          document.getElementById("txtTempatLahirIbu").value = d.TempatLahirIbu;
          document.getElementById(
            "txtTanggalLahirIbu"
          ).value = change_date_format(d.TanggalLahirIbu);

          document.getElementById("txtNamaAyah").value = d.NamaAyah;
          document.getElementById("txtKewarganegaraanAyah").value =
            d.KewarganegaraanAyah;
          document.getElementById("txtTempatLahirAyah").value =
            d.TempatLahirAyah;
          document.getElementById(
            "txtTanggalLahirAyah"
          ).value = change_date_format(d.TanggalLahirAyah);

          document.getElementById("txtAlamatOrangTua").value = d.AlamatOrangTua;
          document.getElementById("txtTeleponOrangtua").value =
            d.TeleponOrangTua;

          document.getElementById("txtNamaPasangan").value = d.NamaPasangan;
          document.getElementById("txtKewarganegaraanPasangan").value =
            d.KewarganegaraanPasangan;
          document.getElementById("txtTempatLahirPasangan").value =
            d.TempatLahirPasangan;
          document.getElementById(
            "txtTanggalLahirPasangan"
          ).value = change_date_format(d.TanggalLahirPasangan);
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
  get_akun();
};
