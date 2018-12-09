window.onload = function () {
    var getDates = function (startDate) {
        var dates = [],
            endDate = new Date(startDate),
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };

        endDate.setMonth(endDate.getMonth() + 1);

        while (currentDate < endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    displayDate = function (theDate, x, y) {
        // Usage
        defaultMinggu = ['', '', '', '', '', '', ''];
        namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
        namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober", "November", "Desember"]
        bulan = [];

        minggu = Object.create(defaultMinggu);
        selected = theDate.getDate();
        theDate.setDate(1);
        dates = getDates(theDate);
        dates.forEach(function (date) {
            minggu[date.getDay()] = date.getDate();
            if (date.getDay() == 6) {
                bulan.push(minggu);
                minggu = Object.create(defaultMinggu);
            }
        });
        bulan.push(minggu);

        showed = document.getElementById("ui-date");
        if (showed) {
            showed.remove();
        }
        div = document.createElement("DIV");
        div.id = "ui-date";
        div.style.top = y + "px";
        div.style.left = x + "px";
        navDiv = document.createElement("DIV");

        prevSpan = document.createElement("SPAN");
        prevSpan.classList.add("ui-date-prev");
        prevText = document.createTextNode("prev");
        prevSpan.appendChild(prevText);

        nextSpan = document.createElement("SPAN");
        nextSpan.classList.add("ui-date-next");
        nextText = document.createTextNode("next");
        nextSpan.appendChild(nextText);

        monthSpan = document.createElement("SPAN");
        monthSpan.classList.add("ui-date-month");
        monthText = document.createTextNode(namaBulan[theDate.getMonth()]);
        monthSpan.appendChild(monthText);

        yearSpan = document.createElement("SPAN");
        yearSpan.classList.add("ui-date-year");
        yearText = document.createTextNode(theDate.getFullYear());
        yearSpan.appendChild(yearText);

        navDiv.appendChild(prevSpan);
        navDiv.appendChild(monthSpan);
        navDiv.appendChild(yearSpan);
        navDiv.appendChild(nextSpan);

        div.appendChild(navDiv);

        table = document.createElement("TABLE");
        thead = document.createElement("THEAD");
        tr = document.createElement("TR");
        namaHari.forEach(function (hari) {
            th = document.createElement("TH");
            text = document.createTextNode(hari);
            th.appendChild(text);
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        tbody = document.createElement("TBODY");
        bulan.forEach(function (minggu) {
            tr = document.createElement("TR");
            for (i = 0; i < 7; i++) {
                td = document.createElement("TD");
                if (minggu[i] == selected){
                    td.classList.add("selected");
                }
                text = document.createTextNode(minggu[i]);
                td.appendChild(text);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        body = document.getElementsByTagName("body")[0];
        body.appendChild(div);
    }
    hideDate = function () {

    }

    fields = document.getElementsByClassName("my-datepicker");
    for (i = 0; i < fields.length; i++) {
        fields[i].onclick = function (e) {
            console.log(new Date(this.value), date);
            if(this.value){
                displayDate(new Date(this.value), e.clientX, e.clientY);
            }else{
                displayDate(date, e.clientX, e.clientY);
            }
            
        };
    }

}