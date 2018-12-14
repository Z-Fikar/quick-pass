<?php
session_start();

if (isset($_SESSION["UserID"])) {
	header("Location: user/dasbor");
	// include("keluar.html");
} else {
	header("Location: home/masuk");
	// include("masuk.html");
}
