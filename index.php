<?php
session_start();

if (isset($_SESSION["UserID"])) {
	header("Location: pages/dasbor.html");
	// include("keluar.html");
} else {
	header("Location: pages/masuk.html");
	// include("masuk.html");
}
