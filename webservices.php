<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$cdb = parse_url("mysql://b3ec54291aa0c0:42450637@us-cdbr-iron-east-01.cleardb.net/heroku_f4b7857c0620d82?reconnect=true");
$server = $cdb["host"];
$user = $cdb["user"];
$pass = $cdb["pass"];
$db = substr($cdb["path"], 1);

// server
$conn = mysqli_connect($server, $user, $pass, $db);

// local
// $conn = mysqli_connect('localhost', 'root', '', 'db_pass');

function get_pekerjaan()
{
    $conn = $GLOBALS["conn"];
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
    $conn = $GLOBALS["conn"];
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
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $str_json = file_get_contents('php://input');
        $d = json_decode($str_json);
        $AlamatEmail = $d->AlamatEmail;
        $KataSandi = md5($d->KataSandi);

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
			INSERT INTO profil (UserID) VALUES ($UserID)";
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
    $conn = $GLOBALS["conn"];
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

        if (!$row["SudahAktif"]) {
            throw new Exception("Akun belum aktif");
        }

        $ID = $row["ID"];
        $AksesID = $row["AksesID"];

        $_SESSION["UserID"] = $ID;
        $_SESSION["AksesID"] = $AksesID;

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
        unset($_SESSION["AksesID"]);
        unset($_SESSION["Aktif"]);

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

function get_akun()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);
        $UserID = $_SESSION["UserID"];
        $kueri = "select * from Otentikasi where ID=$UserID;";
        $res = mysqli_query($conn, $kueri);
        $d = mysqli_fetch_array($res);

        $data["AlamatEmail"] = $d["AlamatEmail"];

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
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

function get_profil()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);
        $tmp = $GLOBALS["d"];

        $UserID = $_SESSION["UserID"];
        if (isset($tmp->UserID) && $_SESSION["AksesID"] == "1") {
            $UserID = $tmp->UserID;
        }

        $kueri = "select * from Profil where UserID=$UserID;";
        $res = mysqli_query($conn, $kueri);
        $d = mysqli_fetch_array($res);

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
            "List" => $data,
            "InfoMessage" => "Data profil berhasil diterima",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Data profil gagal diterima: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function update_akun()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $str_json = file_get_contents('php://input');
        $d = json_decode($str_json);

        $UserID = $_SESSION["UserID"];

        mysqli_begin_transaction($conn);

        $AlamatEmail = $d->AlamatEmail;
        if ($tmp = $d->KataSandi) {
            $KataSandi = md5($tmp);
            $kueri = "
                update Otentikasi set
                    AlamatEmail = '$AlamatEmail',
                    KataSandi = '$KataSandi'
                where ID = $UserID";
        } else {
            $kueri = "
                update Otentikasi set
                    AlamatEmail = '$AlamatEmail'
                where ID = $UserID";
        }
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

function update_profil()
{
    $conn = $GLOBALS["conn"];
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

        $pasanganSet = ",
            NamaPasangan = '$NamaPasangan',
            KewarganegaraanPasangan = '$KewarganegaraanPasangan',
            TempatLahirPasangan = '$TempatLahirPasangan',
            TanggalLahirPasangan = '$TanggalLahirPasangan'";
        if ($StatusSipilID == 2) {
            $pasanganSet = ",
                NamaPasangan = 'TIDAK KAWIN',
                KewarganegaraanPasangan = 'TIDAK KAWIN',
                TempatLahirPasangan = 'TIDAK KAWIN',
                TanggalLahirPasangan = '9999-12-31'";
        }

        mysqli_begin_transaction($conn);

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
                TeleponOrangTua = '$TeleponOrangTua'

                $pasanganSet
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

function check_profil()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);
        $UserID = $_SESSION["UserID"];
        $kueri = "
        SELECT 
            if(UserID>'',0,1)+if(NamaLengkap>'',0,1)+if(JenisKelamin>'',0,1)+if(NamaLain>'',0,1)+if(TinggiBadan>'',0,1)+if(TempatLahir>'',0,1)+if(TanggalLahir>'',0,1)
            +if(NomorKTPWNI>'',0,1)+if(TanggalDikeluarkan>'',0,1)+if(TempatDikeluarkan>'',0,1)+if(TanggalBerakhir>'',0,1)
            +if(Alamat>'',0,1)+if(Telepon>'',0,1)+if(StatusSipilID,0,1)
            +if(PekerjaanID>'',0,1)+if(Pekerjaan>'',0,1)+if(NamaAlamatKantor>'',0,1)+if(TeleponKantor>'',0,1)
            +if(NamaIbu>'',0,1)+if(KewarganegaraanIbu>'',0,1)+if(TempatLahirIbu>'',0,1)+if(TanggalLahirIbu>'',0,1)
            +if(NamaAyah>'',0,1)+if(KewarganegaraanAyah>'',0,1)+if(TempatLahirAyah>'',0,1)+if(TanggalLahirAyah>'',0,1)
            +if(AlamatOrangTua>'',0,1)+if(TeleponOrangTua>'',0,1)
            +if(NamaPasangan>'',0,1)+if(KewarganegaraanPasangan>'',0,1)+if(TempatLahirPasangan>'',0,1)+if(TanggalLahirPasangan>'',0,1) 
        JumlahKosong 
        FROM profil WHERE UserID = $UserID;
        ";
        $res = mysqli_query($conn, $kueri);
        $d = mysqli_fetch_array($res);

        if (intval($d["JumlahKosong"])) {
            throw new Exception();
        }

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Data Profil Sudah diisi",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Data Profil Belum diisi $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function get_permohonanHeader()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);

        $kueri = "select * from MasterPermohonanHeader order by ID;";
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

function get_permohonanDetail()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);

        $kueri = "select * from MasterPermohonanDetail order by ID;";
        $res = mysqli_query($conn, $kueri);
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = array(
                "ID" => $row["ID"],
                "HeaderID" => $row["HeaderID"],
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

function save_permohonan()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $UserID = $_SESSION["UserID"];
        $HeaderID = $d->HeaderID;
        $DetailID = $d->DetailID;

        mysqli_begin_transaction($conn);

        $kueri = "
            select Persetujuan from Permohonan
            where PemohonID = $UserID
            and StatusID < 6
			;";
        $res = mysqli_query($conn, $kueri);
        if (mysqli_fetch_array($res)) {
            throw new Exception("Selesaikan permohonan sebelumnya lebih dahulu");
        }

        $kueri = "
			insert into permohonan(
                PemohonID,
                StatusID,
				PermohonanHeaderID,
                PermohonanDetailID,
                TanggalPermohonan
			) values (
                $UserID,
                1,
				$HeaderID,
                $DetailID,
                NOW()
			)";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Permohonan berhasil disimpan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal disimpan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function get_permohonan()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $UserID = $_SESSION["UserID"];
        $PermohonanID = $d->PermohonanID;

        mysqli_begin_transaction($conn);

        $kueri = "
            select
                b.Nama as Header,
                c.Nama as Detail,
                a.StatusID,
                a.Catatan
            from Permohonan a
                left join MasterPermohonanHeader b on a.PermohonanHeaderID = b.ID
                left join MasterPermohonanDetail c on a.PermohonanDetailID = c.ID
            where a.ID = $PermohonanID
			;";
        $res = mysqli_query($conn, $kueri);
        if (!$row = mysqli_fetch_array($res)) {
            throw new Exception("Belum buat permohonan");
        }
        $data = array(
            "Header" => $row["Header"],
            "Detail" => $row["Detail"],
            "Status" => $row["StatusID"],
            "Catatan" => $row["Catatan"],
        );

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
            "InfoMessage" => "Permohonan ditemukan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan tidak ditemukan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function delete_permohonan()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $UserID = $_SESSION["UserID"];
        $PermohonanID = $d->id;

        mysqli_begin_transaction($conn);

        $kueri = "
            update Permohonan set StatusID = 7
            where ID = $PermohonanID
            ;";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Permohonan berhasil dibatalkan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal dibatalkan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function getAll_permohonan()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];

        if ($_SESSION["AksesID"] != 1) {
            $UserID = $_SESSION["UserID"];
            $kondisi = "a.PemohonID = $UserID ";
        } else {
            $kondisi = "StatusID < 5";
        }

        mysqli_begin_transaction($conn);

        $kueri = "
            select
                a.ID,
                a.TanggalPermohonan,
                b.NamaLengkap,
                c.Nama JenisPermohonan,
                d.Nama Status
            from
                Permohonan a
                left join Profil b on a.PemohonID = b.UserID
                left join MasterPermohonanHeader c on a.PermohonanHeaderID = c.ID
                left join MasterStatus d on a.StatusID = d.ID
            where $kondisi
            order by a.ID desc
			;";

        $res = mysqli_query($conn, $kueri);
        $data = array();
        while ($row = mysqli_fetch_array($res)) {
            $tmp = array(
                "ID" => $row["ID"],
                "TanggalPermohonan" => $row["TanggalPermohonan"],
                "NamaLengkap" => $row["NamaLengkap"],
                "JenisPermohonan" => $row["JenisPermohonan"],
                "Status" => $row["Status"],
            );
            array_push($data, $tmp);
        }

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
            "InfoMessage" => "Permohonan berhasil diambil",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal diambil: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function getOne_permohonan()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $ID = $d->ID;

        mysqli_begin_transaction($conn);

        $kueri = "
            select
                d.UserID, d.NamaLengkap, d.JenisKelamin, d.NamaLain, d.TinggiBadan, d.TempatLahir, d.TanggalLahir,
                d.NomorKTPWNI, d.TanggalDikeluarkan, d.TempatDikeluarkan, d.TanggalBerakhir,
                d.Alamat, d.Telepon, e.Nama StatusSipil,
                d.Pekerjaan, d.NamaAlamatKantor, d.TeleponKantor,
                d.NamaIbu, d.KewarganegaraanIbu, d.TempatLahirIbu, d.TanggalLahirIbu,
                d.NamaAyah, d.KewarganegaraanAyah, d.TempatLahirAyah, d.TanggalLahirAyah,
                d.AlamatOrangTua, d.TeleponOrangTua,
                d.NamaPasangan, d.KewarganegaraanPasangan, d.TempatLahirPasangan, d.TanggalLahirPasangan,
                b.Nama Header, c.Nama Detail,
                a.CatatanWawancara, a.PasporLama, a.PasporBaru
            from Permohonan a
                left join MasterPermohonanHeader b on a.PermohonanHeaderID = b.ID
                left join MasterPermohonanDetail c on a.PermohonanDetailID = c.ID
                left join Profil d on a.PemohonID = d.UserID
                left join MasterStatusSipil e on e.ID = d.StatusSipilID
            where a.ID = $ID
			;";
        $res = mysqli_query($conn, $kueri);
        if (!$d = mysqli_fetch_array($res)) {
            throw new Exception("Belum buat permohonan");
        }

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
        $data["StatusSipil"] = $d["StatusSipil"];

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

        $data["PermohonanHeader"] = $d["Header"];
        $data["PermohonanDetail"] = $d["Detail"];

        $data["CatatanWawancara"] = $d["CatatanWawancara"];
        $data["PasporLama"] = $d["PasporLama"];
        $data["PasporBaru"] = $d["PasporBaru"];

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
            "InfoMessage" => "Permohonan ditemukan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan tidak ditemukan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function get_lampiran()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        mysqli_begin_transaction($conn);

        $kueri = "select * from MasterLampiran order by ID";
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
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Get data failed: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function getAll_lampiran()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $AdminID = $_SESSION["UserID"];
        $PermohonanID = $d->id;

        mysqli_begin_transaction($conn);

        $kueri = "
            select b.ID, b.Nama
            from PermohonanLampiran a
                left join MasterLampiran b on a.LampiranID = b.ID
            where a.PermohonanID = $PermohonanID
            ;";
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
        mysqli_rollback($conn);
        $return = array(
            "InfoMessage" => "Get data failed: $e",
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function get_paspor()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $NomorPaspor = $d->NomorPaspor;

        mysqli_begin_transaction($conn);

        $kueri = "
            select * from Paspor where NomorPaspor = '$NomorPaspor'
			;";
        $res = mysqli_query($conn, $kueri);
        if (!$d = mysqli_fetch_array($res)) {
            throw new Exception("Belum buat permohonan");
        }

        $data["NomorRegister"] = $d["NomorRegister"];
        $data["NamaPemilik"] = $d["NamaPemilik"];
        $data["AlamatPemilik"] = $d["AlamatPemilik"];
        $data["TanggalDibuat"] = $d["TanggalDibuat"];
        $data["TanggalBerakhir"] = $d["TanggalBerakhir"];
        $data["TempatDikeluarkan"] = $d["TempatDikeluarkan"];

        mysqli_commit($conn);
        $return = array(
            "List" => $data,
            "InfoMessage" => "Permohonan ditemukan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan tidak ditemukan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function save_loket()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $AdminID = $_SESSION["UserID"];
        $PermohonanID = $d->id;
        $daftarLampiran = $d->daftarLampiran;
        $catatanWawancara = $d->catatanWawancara;

        mysqli_begin_transaction($conn);

        $kueri = "
            update Permohonan set
                LoketID = $AdminID,
                WawancaraID = $AdminID,
                CatatanWawancara = '$catatanWawancara',
                StatusID = 3
            where ID = $PermohonanID
			;";
        mysqli_query($conn, $kueri);

        $kueri = "
            delete from PermohonanLampiran
            where PermohonanID = $PermohonanID
			";
        mysqli_query($conn, $kueri);

        $tmp = [];
        foreach ($daftarLampiran as $item) {
            $tmp[] = "($PermohonanID, $item->ID)";
        }
        $values = implode(", ", $tmp);
        $kueri = "
            insert into PermohonanLampiran
            values $values;";

        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Permohonan berhasil disimpan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal disimpan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function save_tu()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $AdminID = $_SESSION["UserID"];
        $PermohonanID = $d->id;
        $PasporLama = $d->PasporLama;
        $PasporBaru = $d->PasporBaru;

        mysqli_begin_transaction($conn);

        if ($PasporLama) {
            $updatePasporLama = "PasporLama = $PasporLama,";
        } else {
            $updatePasporLama = "";
        }

        $kueri = "
            update Permohonan set
                $updatePasporLama
                PasporBaru = $PasporBaru,
                StatusID = 4
            where ID = $PermohonanID
			;";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Permohonan berhasil disimpan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal disimpan: " . $e->getMessage(),
            "SuccessMessage" => false,
        );
    }

    header('Content-type: application/json');
    mysqli_close($conn);
    echo json_encode($return);
}

function save_verifikasi()
{
    $conn = $GLOBALS["conn"];
    if (mysqli_connect_errno()) {
        echo "Connect failed: %s\n", mysqli_connect_error();
        exit();
    }

    try {
        $d = $GLOBALS["d"];
        $AdminID = $_SESSION["UserID"];
        $PermohonanID = $d->id;
        $NIKIM = $d->NIKIM;
        $Kelengkapan = $d->lengkap;
        $Pencekalan = $d->cekal;
        $Kelainan = $d->kelainan;
        $Persetujuan = $d->persetujuan;
        $Catatan = $d->catatan;
        $Status = $d->status;

        mysqli_begin_transaction($conn);

        $kueri = "
            update Permohonan set
                NIKIM = '$NIKIM',
                Kelengkapan = $Kelengkapan,
                DaftarCekal = $Pencekalan,
                KelainanSurat = $Kelainan,
                Persetujuan = $Persetujuan,
                NIKIMPejimID = $AdminID,
                KelengkapanPejimID = $AdminID,
                CekalKelainanPejimID = $AdminID,
                KAKANIMID = $AdminID,
                NIKIMTanggal = NOW(),
                KelengkapanTanggal = NOW(),
                CekalKelainanTanggal = NOW(),
                PersetujuanTanggal = NOW(),
                StatusID = $Status,
                Catatan = '$Catatan'
            where ID = $PermohonanID
            ;";
        mysqli_query($conn, $kueri);

        mysqli_commit($conn);
        $return = array(
            "InfoMessage" => "Permohonan berhasil disimpan",
            "SuccessMessage" => true,
        );
    } catch (Exception $e) {
        mysqli_rollback($conn);

        $return = array(
            "InfoMessage" => "Permohonan gagal disimpan: " . $e->getMessage(),
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
    $funcs = get_defined_functions()["user"];
    $method = substr(strtolower($d->method), 0, -3);
    if (in_array($method, $funcs)) {
        eval($d->method);
    }
}
