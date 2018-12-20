if (window == window.top) {
  // location.href = "/quickpass";
}

window.onload = function() {
  var get_lampiran = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_lampiran();"
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var sb = document.getElementById("sbLampiran");
          var d = data.List;
          for (i = 0; i < d.length; i++) {
            var option = document.createElement("OPTION");
            var text = document.createTextNode(d[i].Nama);
            option.value = d[i].ID;
            option.appendChild(text);
            sb.appendChild(option);
          }
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_lampiran();

  var get_permohonan = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url_string = window.location.href;
    var ID = new URL(url_string).searchParams.get("id");

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "getOne_permohonan();",
      ID: ID
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
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
          document.getElementById("txtStatusSipil").value = d.StatusSipil;
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

          document.getElementById("txtJenisPermohonan").value = d.PermohonanHeader;
          document.getElementById("txtDetailPermohonan").value = d.PermohonanDetail;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonan();

  var lampiran = [];
  var generate_table = function() {
    var d = lampiran;
    var tbody = document.querySelector("#tblLampiran tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (i = 0; i < d.length; i++) {
      var tr = document.createElement("TR");
      var td = document.createElement("TD");
      var txt = document.createTextNode(d[i].ID);
      td.appendChild(txt);
      tr.appendChild(td);
      td = document.createElement("TD");
      txt = document.createTextNode(d[i].Nama);
      td.appendChild(txt);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  };
  var add_lampiran = function() {
    var sb = document.getElementById("sbLampiran");
    var opt = sb.children[sb.selectedIndex];
    var l = {
      ID: opt.value,
      Nama: opt.text
    };
    lampiran = lampiran.filter(function(item) {
      return item.ID != l.ID;
    });
    lampiran.push(l);
    generate_table();
  };
  var btnLampiran = document.getElementById("btnLampiran");
  btnLampiran.onclick = function() {
    add_lampiran();
  };

  var get_paspor = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var txt = document.getElementById("lblNomorPasporLama").value;
    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "get_paspor();",
      NomorPaspor: txt
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          var d = data.List;
          document.getElementById("lblNamaLama").value = d.NamaPemilik;
          document.getElementById("lblAlamatLama").value = d.AlamatPemilik;
          document.getElementById("lblTanggalDibuatLama").value =
            d.TanggalDibuat;
          document.getElementById("lblTanggalBerlakuLama").value =
            d.TanggalBerakhir;
          document.getElementById("lblTempatDikeluarkanLama").value =
            d.TempatDikeluarkan;
          document.getElementById("lblNomorRegisterLama").value =
            d.NomorRegister;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnCariPaspor = document.getElementById("btnCariPaspor");
  btnCariPaspor.onclick = function() {
    get_paspor();
  };

  var inputs = document.querySelectorAll(".readonly input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].readOnly = true;
  }
  var inputs = document.querySelectorAll(".readonly textarea");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].readOnly = true;
  }
  var inputs = document.querySelectorAll(".readonly input[type=radio]");
  for (i = 0; i < inputs.length; i++) {
    if (!inputs[i].checked) {
      inputs[i].disabled = true;
    }
  }
};
