if (window == window.top) {
  // location.href = "/quickpass";
}

window.onload = function() {
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
        }
      }
    };

    hr.setRequestHeader("Content-type", "application/json");
    hr.send(JSON.stringify(params));
  };
  get_permohonan();

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
