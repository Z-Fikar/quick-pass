<?php
session_start();

if (isset($_SESSION["UserID"]) && isset($_SESSION["AksesID"])){
    if ($_SESSION["AksesID"] == 9) {
		header("Location: user/dasbor");
	} else {
		echo "admin dasbor belum bikin";
		// header("Location: admin/dasbor");
	}
} else {
    header("Location: home/masuk");
}
