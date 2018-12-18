if(window==window.top){
  location.href = "/quickpass"
}

window.onload = function() {
  var get_akun = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "/quickpass/webservices.php";
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
          namaLengkap.appendChild(document.createTextNode(d.NamaLengkap));
          // document.getElementById("txtAlamatEmail").value = d.AlamatEmail;
          // document.getElementById("txtNamaLengkap").value = d.NamaLengkap;
          // document.querySelector(
          //   "input[value='" + d.JenisKelamin + "']"
          // ).checked = true;
          // document.getElementById("txtNamaLain").value = d.NamaLain;
          // document.getElementById("txtTinggiBadan").value = d.TinggiBadan;
          // document.getElementById("txtTempatLahir").value = d.TempatLahir;
          // document.getElementById("txtTanggalLahir").value = change_date_format(
          //   d.TanggalLahir
          // );
          // document.getElementById("txtNomorKTPWNI").value = d.NomorKTPWNI;
          // document.getElementById(
          //   "txtTanggalDikeluarkan"
          // ).value = change_date_format(d.TanggalDikeluarkan);
          // document.getElementById("txtTempatDikeluarkan").value =
          //   d.TempatDikeluarkan;
          // document.getElementById(
          //   "txtTanggalBerakhir"
          // ).value = change_date_format(d.TanggalBerakhir);
          // document.getElementById("txtAlamat").value = d.Alamat;
          // document.getElementById("txtTelepon").value = d.Telepon;
          // document.getElementById("sbStatusSipil").value = d.StatusSipilID;
          // document.getElementById("sbPekerjaan").value = d.PekerjaanID;
          // document.getElementById("txtPekerjaan").value = d.Pekerjaan;
          // document.getElementById("txtNamaAlamatKantor").value =
          //   d.NamaAlamatKantor;
          // document.getElementById("txtTeleponKantor").value = d.TeleponKantor;

          // document.getElementById("txtNamaIbu").value = d.NamaIbu;
          // document.getElementById("txtKewarganegaraanIbu").value =
          //   d.KewarganegaraanIbu;
          // document.getElementById("txtTempatLahirIbu").value = d.TempatLahirIbu;
          // document.getElementById(
          //   "txtTanggalLahirIbu"
          // ).value = change_date_format(d.TanggalLahirIbu);

          // document.getElementById("txtNamaAyah").value = d.NamaAyah;
          // document.getElementById("txtKewarganegaraanAyah").value =
          //   d.KewarganegaraanAyah;
          // document.getElementById("txtTempatLahirAyah").value =
          //   d.TempatLahirAyah;
          // document.getElementById(
          //   "txtTanggalLahirAyah"
          // ).value = change_date_format(d.TanggalLahirAyah);

          // document.getElementById("txtAlamatOrangTua").value = d.AlamatOrangTua;
          // document.getElementById("txtTeleponOrangtua").value =
          //   d.TeleponOrangTua;

          // document.getElementById("txtNamaPasangan").value = d.NamaPasangan;
          // document.getElementById("txtKewarganegaraanPasangan").value =
          //   d.KewarganegaraanPasangan;
          // document.getElementById("txtTempatLahirPasangan").value =
          //   d.TempatLahirPasangan;
          // document.getElementById(
          //   "txtTanggalLahirPasangan"
          // ).value = change_date_format(d.TanggalLahirPasangan);
        } else {
          alert(data.InfoMessage);
        }
      }
    };
    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };

  get_akun();
};
