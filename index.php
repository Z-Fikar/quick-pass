<?php
session_start();

if (isset($_SESSION["UserID"]) && isset($_SESSION["AksesID"])){
    if ($_SESSION["AksesID"] == 1) {
		header("Location: admin/dasbor/");
	} else {
		header("Location: user/dasbor/");
	}
} else {
    header("Location: home/masuk/");
}
