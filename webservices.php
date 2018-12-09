<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function get_pekerjaan()
{
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);

        $kueri = "select * from MasterPekerjaan order by ID";
        $res = mysqli_query($conn, $kueri);
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = array(
                "ID" => $row["ID"],
                "Nama" => $row["Nama"],
            );
        }

        $return = array(
            "List" => $data,
            "InfoMessage" => "Get data success",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        $return = array(
            "InfoMessage" => "Get data failed: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function get_statusSipil()
{
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);

        $kueri = "select * from MasterStatusSipil order by ID";
        $res = mysqli_query($conn, $kueri);
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = array(
                "ID" => $row["ID"],
                "Nama" => $row["Nama"],
            );
        }

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
            "InfoMessage" => "Get data success",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        $return = array(
            "InfoMessage" => "Get data failed: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function save_akun()
{
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $str_json = file_get_contents('php://input');
        $d = json_decode($str_json);
        $AlamatEmail = $d->AlamatEmail;
        $KataSandi = md5($d->KataSandi);

        $NamaLengkap = $d->NamaLengkap;
        $JenisKelamin = $d->JenisKelamin;
        $NamaLain = $d->NamaLain;
        $TinggiBadan = $d->TinggiBadan;
        $TempatLahir = $d->TempatLahir;
        $TanggalLahir = $d->TanggalLahir;
        $NomorKTPWNI = $d->NomorKTPWNI;
        $TanggalDikeluarkan = $d->TanggalDikeluarkan;
        $TempatDikeluarkan = $d->TempatDikeluarkan;
        $TanggalBerakhir = $d->TanggalBerakhir;
        $Alamat = $d->Alamat;
        $Telepon = $d->Telepon;
        $StatusSipilID = $d->StatusSipilID;

        $PekerjaanID = $d->PekerjaanID;
        $Pekerjaan = $d->Pekerjaan;
        $NamaAlamatKantor = $d->NamaAlamatKantor;
        $TeleponKantor = $d->TeleponKantor;

        $NamaIbu = $d->NamaIbu;
        $KewarganegaraanIbu = $d->KewarganegaraanIbu;
        $TempatLahirIbu = $d->TempatLahirIbu;
        $TanggalLahirIbu = $d->TanggalLahirIbu;

        $NamaAyah = $d->NamaAyah;
        $KewarganegaraanAyah = $d->KewarganegaraanAyah;
        $TempatLahirAyah = $d->TempatLahirAyah;
        $TanggalLahirAyah = $d->TanggalLahirAyah;

        $AlamatOrangTua = $d->AlamatOrangTua;
        $TeleponOrangTua = $d->TeleponOrangTua;

        $NamaPasangan = $d->NamaPasangan;
        $KewarganegaraanPasangan = $d->KewarganegaraanPasangan;
        $TempatLahirPasangan = $d->TempatLahirPasangan;
        $TanggalLahirPasangan = $d->TanggalLahirPasangan;

        mysqli_begin_transaction($conn);

        $kueri = "
			insert into otentikasi(
				AlamatEmail,
				KataSandi,
				AksesID,
				SudahAktif
			) values (
				'$AlamatEmail',
				'$KataSandi',
				9,
				1
			)";
        mysqli_query($conn, $kueri);

        $UserID = mysqli_insert_id($conn);
        $kueri = "
			INSERT INTO profil (
				UserID, NamaLengkap, JenisKelamin, NamaLain, TinggiBadan, TempatLahir, TanggalLahir,
				NomorKTPWNI, TanggalDikeluarkan, TempatDikeluarkan, TanggalBerakhir,
				Alamat, Telepon, StatusSipilID,
				PekerjaanID, Pekerjaan, NamaAlamatKantor, TeleponKantor,
				NamaIbu, KewarganegaraanIbu, TempatLahirIbu, TanggalLahirIbu,
				NamaAyah, KewarganegaraanAyah, TempatLahirAyah, TanggalLahirAyah,
				AlamatOrangTua, TeleponOrangTua,
				NamaPasangan, KewarganegaraanPasangan, TempatLahirPasangan, TanggalLahirPasangan
			) VALUES (
				$UserID, '$NamaLengkap', '$JenisKelamin', '$NamaLain', $TinggiBadan, '$TempatLahir', '$TanggalLahir',
				'$NomorKTPWNI', '$TanggalDikeluarkan', '$TempatDikeluarkan', '$TanggalBerakhir',
				'$Alamat', '$Telepon', $StatusSipilID,
				$PekerjaanID, '$Pekerjaan',' $NamaAlamatKantor', '$TeleponKantor',
				'$NamaIbu', '$KewarganegaraanIbu', '$TempatLahirIbu', '$TanggalLahirIbu',
				'$NamaAyah', '$KewarganegaraanAyah', '$TempatLahirAyah', '$TanggalLahirAyah',
				'$AlamatOrangTua', '$TeleponOrangTua',
				'$NamaPasangan', '$KewarganegaraanPasangan', '$TempatLahirPasangan', '$TanggalLahirPasangan'
			)";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Pendaftaran akun berhasil dilakukan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);
        $err = explode(" ", $e->getMessage());
        $str_err = $e->getMessage();
        if ($err[0] == "Duplicate") {
            $str_err = "'$AlamatEmail' sudah terdaftar";
        }
        $return = array(
            "InfoMessage" => "Pendaftaran akun gagal dilakukan: " . $str_err,
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function do_login()
{
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS['d'];
        $AlamatEmail = $d->AlamatEmail;
        $KataSandi = md5($d->KataSandi);

        mysqli_begin_transaction($conn);

        $kueri = "select * from Otentikasi where AlamatEmail='$AlamatEmail'";
        $res = mysqli_query($conn, $kueri);
        if (empty(mysqli_num_rows($res))) {
            throw new Exception("Alamat email tidak terdaftar");
        }

        $kueri = "select * from Otentikasi where AlamatEmail='$AlamatEmail' and KataSandi='$KataSandi'";
        $res = mysqli_query($conn, $kueri);
        if (empty(mysqli_num_rows($res))) {
            throw new Exception("Kata sandi tidak sama");
        }

        $row = mysqli_fetch_array($res, MYSQLI_ASSOC);

        $ID = $row["ID"];
        $AksesID = $row["AksesID"];
        $SudahAktif = $row["SudahAktif"];

        $_SESSION["UserID"] = $ID;

        $return = array(
            "InfoMessage" => "Masuk sukses",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        $return = array(
            "InfoMessage" => "Gagal masuk: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function do_logout()
{
    try {
        unset($_SESSION["UserID"]);

        $return = array(
            "InfoMessage" => "Keluar sukses",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        $return = array(
            "InfoMessage" => "Gagal Keluar: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    echo json_encode($return);
}

function check_login()
{
    try {
        if (!isset($_SESSION["UserID"])) {
            throw new Exception("Silahkan masuk");
        }

        $return = array(
            "InfoMessage" => "Sudah masuk",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        $return = array(
            "InfoMessage" => $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    echo json_encode($return);
}

function get_akun(){
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);
        $UserID = $_SESSION["UserID"];
        $kueri = "select a.*, b.* from Otentikasi a inner join Profil b on a.ID = b.UserID where a.ID=$UserID;";
        $res = mysqli_query($conn, $kueri);
        $d = mysqli_fetch_array($res);

        $data["AlamatEmail"] = $d["AlamatEmail"];

        $data["NamaLengkap"] = $d["NamaLengkap"];
        $data["JenisKelamin"] = $d["JenisKelamin"];
        $data["NamaLain"] = $d["NamaLain"];
        $data["TinggiBadan"] = $d["TinggiBadan"];
        $data["TempatLahir"] = $d["TempatLahir"];
        $data["TanggalLahir"] = $d["TanggalLahir"];
        $data["NomorKTPWNI"] = $d["NomorKTPWNI"];
        $data["TanggalDikeluarkan"] = $d["TanggalDikeluarkan"];
        $data["TempatDikeluarkan"] = $d["TempatDikeluarkan"];
        $data["TanggalBerakhir"] = $d["TanggalBerakhir"];
        $data["Alamat"] = $d["Alamat"];
        $data["Telepon"] = $d["Telepon"];
        $data["StatusSipilID"] = $d["StatusSipilID"];

        $data["PekerjaanID"] = $d["PekerjaanID"];
        $data["Pekerjaan"] = $d["Pekerjaan"];
        $data["NamaAlamatKantor"] = $d["NamaAlamatKantor"];
        $data["TeleponKantor"] = $d["TeleponKantor"];

        $data["NamaIbu"] = $d["NamaIbu"];
        $data["KewarganegaraanIbu"] = $d["KewarganegaraanIbu"];
        $data["TempatLahirIbu"] = $d["TempatLahirIbu"];
        $data["TanggalLahirIbu"] = $d["TanggalLahirIbu"];

        $data["NamaAyah"] = $d["NamaAyah"];
        $data["KewarganegaraanAyah"] = $d["KewarganegaraanAyah"];
        $data["TempatLahirAyah"] = $d["TempatLahirAyah"];
        $data["TanggalLahirAyah"] = $d["TanggalLahirAyah"];

        $data["AlamatOrangTua"] = $d["AlamatOrangTua"];
        $data["TeleponOrangTua"] = $d["TeleponOrangTua"];

        $data["NamaPasangan"] = $d["NamaPasangan"];
        $data["KewarganegaraanPasangan"] = $d["KewarganegaraanPasangan"];
        $data["TempatLahirPasangan"] = $d["TempatLahirPasangan"];
        $data["TanggalLahirPasangan"] = $d["TanggalLahirPasangan"];

        mysqli_commit($conn);
        $return = array(
            "List"=> $data,
            "InfoMessage" => "Data akun berhasil dikirim",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Data akun gagal dikirim: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function update_akun()
{
    $conn = mysqli_connect("localhost", "root", "", "db_pass");
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $str_json = file_get_contents('php://input');
        $d = json_decode($str_json);

        $UserID = $_SESSION["UserID"];
        $NamaLengkap = $d->NamaLengkap;
        $JenisKelamin = $d->JenisKelamin;
        $NamaLain = $d->NamaLain;
        $TinggiBadan = $d->TinggiBadan;
        $TempatLahir = $d->TempatLahir;
        $TanggalLahir = $d->TanggalLahir;
        $NomorKTPWNI = $d->NomorKTPWNI;
        $TanggalDikeluarkan = $d->TanggalDikeluarkan;
        $TempatDikeluarkan = $d->TempatDikeluarkan;
        $TanggalBerakhir = $d->TanggalBerakhir;
        $Alamat = $d->Alamat;
        $Telepon = $d->Telepon;
        $StatusSipilID = $d->StatusSipilID;

        $PekerjaanID = $d->PekerjaanID;
        $Pekerjaan = $d->Pekerjaan;
        $NamaAlamatKantor = $d->NamaAlamatKantor;
        $TeleponKantor = $d->TeleponKantor;

        $NamaIbu = $d->NamaIbu;
        $KewarganegaraanIbu = $d->KewarganegaraanIbu;
        $TempatLahirIbu = $d->TempatLahirIbu;
        $TanggalLahirIbu = $d->TanggalLahirIbu;

        $NamaAyah = $d->NamaAyah;
        $KewarganegaraanAyah = $d->KewarganegaraanAyah;
        $TempatLahirAyah = $d->TempatLahirAyah;
        $TanggalLahirAyah = $d->TanggalLahirAyah;

        $AlamatOrangTua = $d->AlamatOrangTua;
        $TeleponOrangTua = $d->TeleponOrangTua;

        $NamaPasangan = $d->NamaPasangan;
        $KewarganegaraanPasangan = $d->KewarganegaraanPasangan;
        $TempatLahirPasangan = $d->TempatLahirPasangan;
        $TanggalLahirPasangan = $d->TanggalLahirPasangan;

        mysqli_begin_transaction($conn);

        $AlamatEmail = $d->AlamatEmail;
        if($tmp = $d->KataSandi){
            $KataSandi = md5($tmp);
            $kueri = "
                update Otentikasi set
                    AlamatEmail = '$AlamatEmail',
                    KataSandi = '$KataSandi'
                where ID = $UserID";
        }else{
            $kueri = "
                update Otentikasi set
                    AlamatEmail = '$AlamatEmail'
                where ID = $UserID";
        }
        mysqli_query($conn, $kueri);

        $kueri = "
			update Profil set
                UserID = $UserID, 
                NamaLengkap = '$NamaLengkap', 
                JenisKelamin = '$JenisKelamin', 
                NamaLain = '$NamaLain', 
                TinggiBadan = $TinggiBadan, 
                TempatLahir = '$TempatLahir', 
                TanggalLahir = '$TanggalLahir',
                
                NomorKTPWNI = '$NomorKTPWNI', 
                TanggalDikeluarkan = '$TanggalDikeluarkan', 
                TempatDikeluarkan = '$TempatDikeluarkan', 
                TanggalBerakhir = '$TanggalBerakhir',
                Alamat = '$Alamat', 
                Telepon = '$Telepon', 
                StatusSipilID = $StatusSipilID,

                PekerjaanID = $PekerjaanID, 
                Pekerjaan = '$Pekerjaan', 
                NamaAlamatKantor = '$NamaAlamatKantor', 
                TeleponKantor = '$TeleponKantor',

                NamaIbu = '$NamaIbu', 
                KewarganegaraanIbu = '$KewarganegaraanIbu', 
                TempatLahirIbu = '$TempatLahirIbu', 
                TanggalLahirIbu = '$TanggalLahirIbu',
                NamaAyah = '$NamaAyah', 
                KewarganegaraanAyah = '$KewarganegaraanAyah', 
                TempatLahirAyah = '$TempatLahirAyah', 
                TanggalLahirAyah = '$TanggalLahirAyah',
                
                AlamatOrangTua = '$AlamatOrangTua', 
                TeleponOrangTua = '$TeleponOrangTua',
                NamaPasangan = '$NamaPasangan', 
                KewarganegaraanPasangan = '$KewarganegaraanPasangan', 
                TempatLahirPasangan = '$TempatLahirPasangan', 
                TanggalLahirPasangan = '$TanggalLahirPasangan'
			where UserID = $UserID";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Perubahan berhasil disimpan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Perubahan gagal dilakukan: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

$str_json = file_get_contents('php://input');
if (!empty($str_json)) {
    $d = json_decode($str_json);
    eval($d->method);
}
