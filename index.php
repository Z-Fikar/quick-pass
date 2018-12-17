<?php
session_start();

if (isset($_SESSION["UserID"]) && isset($_SESSION["AksesID"])){
    if ($_SESSION["AksesID"] == 1) {
		header("Location: admin/");
	} else {
		header("Location: user/");
	}
} else {
    header("Location: home/");
}
