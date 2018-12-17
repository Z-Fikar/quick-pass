var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            if (panel.style.height) {
                panel.style.height = null;
                panel.style.padding = null;
            } else {
                panel.style.height = "auto";
                panel.style.padding = "15px 18px";
            }
        });
    }
    acc[0].classList.toggle("active");
    panel = acc[0].nextElementSibling;
    panel.style.height = "auto";
    panel.style.padding = "15px 18px";
}