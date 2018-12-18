var check_login = function() {
  if (window.XMLHttpRequest) {
    var hr = new XMLHttpRequest();
  } else {
    var hr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "/quickpass/webservices.php";
  hr.open("POST", url, true);
  var params = {
    method: "check_login();"
  };

  hr.onreadystatechange = function() {
    if (hr.readyState == 4 && hr.status == 200) {
      console.log(hr);
      var data = JSON.parse(hr.response);
      if (!data.SuccessMessage) {
        location.href = "/quickpass";
      }
    }
  };

  hr.setRequestHeader("Content-type", "application/json");
  hr.send(JSON.stringify(params));
};
check_login();

window.onload = function() {
  // var get_akun = function() {
    // if (window.XMLHttpRequest) {
      // var hr = new XMLHttpRequest();
    // } else {
      // var hr = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // var url = "/quickpass/webservices.php";
    // hr.open("POST", url, true);
    // var params = {
      // method: "get_akun();"
    // };
    // hr.onreadystatechange = function() {
      // if (hr.readyState == 4 && hr.status == 200) {
        // console.log(hr);
        // var data = JSON.parse(hr.response);
        // if (data.SuccessMessage) {
          // var d = data.List;
          // var namaLengkap = document.getElementById("lblNamaLengkap");
          // namaLengkap.appendChild(document.createTextNode(d.NamaLengkap));
          // // document.getElementById("txtAlamatEmail").value = d.AlamatEmail;
          // // document.getElementById("txtNamaLengkap").value = d.NamaLengkap;
          // // document.querySelector(
          // //   "input[value='" + d.JenisKelamin + "']"
          // // ).checked = true;
          // // document.getElementById("txtNamaLain").value = d.NamaLain;
          // // document.getElementById("txtTinggiBadan").value = d.TinggiBadan;
          // // document.getElementById("txtTempatLahir").value = d.TempatLahir;
          // // document.getElementById("txtTanggalLahir").value = change_date_format(
          // //   d.TanggalLahir
          // // );
          // // document.getElementById("txtNomorKTPWNI").value = d.NomorKTPWNI;
          // // document.getElementById(
          // //   "txtTanggalDikeluarkan"
          // // ).value = change_date_format(d.TanggalDikeluarkan);
          // // document.getElementById("txtTempatDikeluarkan").value =
          // //   d.TempatDikeluarkan;
          // // document.getElementById(
          // //   "txtTanggalBerakhir"
          // // ).value = change_date_format(d.TanggalBerakhir);
          // // document.getElementById("txtAlamat").value = d.Alamat;
          // // document.getElementById("txtTelepon").value = d.Telepon;
          // // document.getElementById("sbStatusSipil").value = d.StatusSipilID;
          // // document.getElementById("sbPekerjaan").value = d.PekerjaanID;
          // // document.getElementById("txtPekerjaan").value = d.Pekerjaan;
          // // document.getElementById("txtNamaAlamatKantor").value =
          // //   d.NamaAlamatKantor;
          // // document.getElementById("txtTeleponKantor").value = d.TeleponKantor;

          // // document.getElementById("txtNamaIbu").value = d.NamaIbu;
          // // document.getElementById("txtKewarganegaraanIbu").value =
          // //   d.KewarganegaraanIbu;
          // // document.getElementById("txtTempatLahirIbu").value = d.TempatLahirIbu;
          // // document.getElementById(
          // //   "txtTanggalLahirIbu"
          // // ).value = change_date_format(d.TanggalLahirIbu);

          // // document.getElementById("txtNamaAyah").value = d.NamaAyah;
          // // document.getElementById("txtKewarganegaraanAyah").value =
          // //   d.KewarganegaraanAyah;
          // // document.getElementById("txtTempatLahirAyah").value =
          // //   d.TempatLahirAyah;
          // // document.getElementById(
          // //   "txtTanggalLahirAyah"
          // // ).value = change_date_format(d.TanggalLahirAyah);

          // // document.getElementById("txtAlamatOrangTua").value = d.AlamatOrangTua;
          // // document.getElementById("txtTeleponOrangtua").value =
          // //   d.TeleponOrangTua;

          // // document.getElementById("txtNamaPasangan").value = d.NamaPasangan;
          // // document.getElementById("txtKewarganegaraanPasangan").value =
          // //   d.KewarganegaraanPasangan;
          // // document.getElementById("txtTempatLahirPasangan").value =
          // //   d.TempatLahirPasangan;
          // // document.getElementById(
          // //   "txtTanggalLahirPasangan"
          // // ).value = change_date_format(d.TanggalLahirPasangan);
        // } else {
          // alert(data.InfoMessage);
        // }
      // }
    // };
    // hr.setRequestHeader("Content-type", "application/json");
    // hr.send(JSON.stringify(params));
  // };

  // get_akun();
  
  var changeActive = function(e){
    if(!e.classList.contains("active")){
      document.querySelector(".sidemenu .active").classList.remove("active");
      e.classList.add("active");
    }
  }
  
  var li = document.querySelectorAll(".sidemenu li");
  for(var i=0; i<li.length; i++){
    li[i].onclick = function(){
      changeActive(this);
    }
  }
  
  var f = document.querySelector("iframe");
  f.onload = function(){
    var href = this.contentWindow.location.href;
    var a = document.querySelectorAll(".sidemenu a");
    for(var i=0; i<a.length; i++){
      if(href == a[i].href){
        changeActive(a[i].childNodes[0]);
        break;
      }
    }
  }

  var theModal = document.querySelector(".modal-account");
  var closeModal = function(){
    if(!theModal.classList.contains("modal-hide")){
      theModal.classList.toggle("modal-hide");
    }
  }

  var btnModal = document.querySelector("#btnAccount");
  window.onclick = function(e){
    if(btnModal.contains(e.target)){
      theModal.classList.toggle("modal-hide");
    } else if(!theModal.contains(e.target)){
      closeModal();
    }
  }

  document.querySelector("iframe").contentDocument.onclick = function(e){
    if(btnModal.contains(e.target)){
      theModal.classList.toggle("modal-hide");
    } else if(!theModal.contains(e.target)){
      closeModal();
    }
  }
};
