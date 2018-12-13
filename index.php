<?php
session_start();

if (isset($_SESSION["UserID"])) {
	header("Location: pages/dasbor");
	// include("keluar.html");
} else {
	header("Location: pages/masuk");
	// include("masuk.html");
}
