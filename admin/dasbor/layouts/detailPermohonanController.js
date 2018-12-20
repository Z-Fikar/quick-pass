if (window == window.top) {
  // location.href = "/quickpass";
}

window.onload = function() {
  var url_string = window.location.href;
  var ID = new URL(url_string).searchParams.get("id");

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

          document.getElementById("txtJenisPermohonan").value =
            d.PermohonanHeader;
          document.getElementById("txtDetailPermohonan").value =
            d.PermohonanDetail;

          document.getElementById("txtWawancara").value =
            d.CatatanWawancara;
          document.getElementById("txtNomorPasporLama").value = d.PasporLama;
          document.getElementById("txtNomorPasporBaru").value = d.PasporBaru;
          get_pasporLama();
          get_pasporBaru();
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonan();

  var lampiran = [];
  var generateTable = function() {
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
  var getAll_lampiran = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "getAll_lampiran();",
      id: ID
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        if (data.SuccessMessage) {
          lampiran = data.List;
          generateTable();
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  getAll_lampiran();

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
    generateTable();
  };
  var btnLampiran = document.getElementById("btnLampiran");
  btnLampiran.onclick = function() {
    add_lampiran();
  };

  var get_pasporLama = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var txt = document.getElementById("txtNomorPasporLama").value;
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
          document.getElementById("txtNamaLama").value = d.NamaPemilik;
          document.getElementById("txtAlamatLama").value = d.AlamatPemilik;
          document.getElementById("txtTanggalDibuatLama").value =
            d.TanggalDibuat;
          document.getElementById("txtTanggalBerlakuLama").value =
            d.TanggalBerakhir;
          document.getElementById("txtTempatDikeluarkanLama").value =
            d.TempatDikeluarkan;
          document.getElementById("txtNomorRegisterLama").value =
            d.NomorRegister;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnCariPasporLama = document.getElementById("btnCariPasporLama");
  btnCariPasporLama.onclick = function() {
    get_pasporLama();
  };

  var get_pasporBaru = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var txt = document.getElementById("txtNomorPasporBaru").value;
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
          document.getElementById("txtTanggalDibuatBaru").value =
            d.TanggalDibuat;
          document.getElementById("txtTanggalBerlakuBaru").value =
            d.TanggalBerakhir;
          document.getElementById("txtTempatDikeluarkanBaru").value =
            d.TempatDikeluarkan;
          document.getElementById("txtNomorRegisterBaru").value =
            d.NomorRegister;
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnCariPasporBaru = document.getElementById("btnCariPasporBaru");
  btnCariPasporBaru.onclick = function() {
    get_pasporBaru();
  };

  var save_loket = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "save_loket();",
      id: ID,
      daftarLampiran: lampiran,
      catatanWawancara: document.getElementById("txtWawancara").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        alert(data.InfoMessage);
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnLoket = document.getElementById("btnSimpanLoket");
  btnLoket.onclick = function() {
    save_loket();
  };

  var save_tu = function() {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "save_tu();",
      id: ID,
      PasporLama: document.getElementById("txtNomorPasporLama").value,
      PasporBaru: document.getElementById("txtNomorPasporBaru").value
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        alert(data.InfoMessage);
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnTU = document.getElementById("btnSimpanTU");
  btnTU.onclick = function() {
    save_tu();
  };

  var save_verifikasi = function(data) {
    if (window.XMLHttpRequest) {
      var hr = new XMLHttpRequest();
    } else {
      var hr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "/quickpass/webservices.php";
    hr.open("POST", url, true);
    var params = {
      method: "save_verifikasi();",
      id: ID,
      NIKIM: document.getElementById("txtNIKIM").value,
      lengkap: document.querySelector("input[name=lengkapSyarat]:checked")
        .value,
      cekal: document.querySelector("input[name=cekal]:checked").value,
      kelainan: document.querySelector("input[name=kelainan]:checked").value,
      persetujuan: document.querySelector("input[name=persetujuan]:checked")
        .value,
      catatan: document.getElementById("txtCatatan").value.replace("'", "\\'"),
      status: data
    };

    hr.onreadystatechange = function() {
      if (hr.readyState == 4 && hr.status == 200) {
        console.log(hr);
        var data = JSON.parse(hr.response);
        alert(data.InfoMessage);
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  var btnBatal = document.getElementById("btnBatal");
  btnBatal.onclick = function() {
    save_verifikasi(7);
  };
  var btnAkhir = document.getElementById("btnSimpanAkhir");
  btnAkhir.onclick = function() {
    save_verifikasi(5);
  };

  var enableVerifikasi = function() {
    var nikim = document.getElementById("txtNIKIM").value != "";
    var lengkapSyarat =
      document.querySelector("input[name=lengkapSyarat]:checked").value == 1;
    var cekal = document.querySelector("input[name=cekal]:checked").value == 0;
    var kelainan =
      document.querySelector("input[name=kelainan]:checked").value == 0;
    var persetujuan =
      document.querySelector("input[name=persetujuan]:checked").value == 1;

    var btnAkhir = document.getElementById("btnSimpanAkhir");
    btnAkhir.disabled = !(
      nikim &&
      lengkapSyarat &&
      cekal &&
      kelainan &&
      persetujuan
    );
  };
  enableVerifikasi();

  var txtNikim = document.getElementById("txtNIKIM");
  txtNikim.onkeyup = enableVerifikasi;

  var alasan = {
    lengkapSyarat: { c: 0, s: "Persyaratan lampiran tidak lengkap" },
    cekal: { c: 1, s: "Tercantum dalam daftar cekal" },
    kelainan: { c: 1, s: "Surat terdapat kelainan" },
    persetujuan: {
      c: 0,
      s: "Permohonan tidak disetujui oleh Kepala Kantor Imigrasi"
    }
  };
  var catatan = [
    "Persyaratan lampiran tidak lengkap",
    "Permohonan tidak disetujui oleh Kepala Kantor Imigrasi"
  ];
  var generateCatatan = function() {
    var ta = document.getElementById("txtCatatan");
    ta.value = catatan.join(",\n");
  };
  generateCatatan();
  var radios = document.querySelectorAll("#verifikasi-cont input[type=radio]");
  for (i = 0; i < radios.length; i++) {
    radios[i].onclick = function() {
      enableVerifikasi();
      var str = alasan[this.name].s;
      catatan = catatan.filter(function(e) {
        return e != str;
      });
      if (this.value == alasan[this.name].c) {
        catatan.push(str);
      }
      generateCatatan();
    };
  }

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

  var textAreas = document.getElementsByTagName("textarea");
  Array.prototype.forEach.call(textAreas, function(elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, "\n");
  });
};
