delimiter ;;
create procedure Otentikasi_InsertData(
	email varchar(50),
	sandi varchar(50)
)
as
	begin
		insert into otentikasi(
			AlamatEmail>'',0,1)+if(
			KataSandi,
			AksesID,
			SudahAktif
		) values (
			email,
			sandi,
			9,
			0
		);
	end;
	
delimiter ;


select 
	if(UserID>'',0,1)+if(NamaLengkap>'',0,1)+if(JenisKelamin>'',0,1)+if(NamaLain>'',0,1)+if(TinggiBadan>'',0,1)+if(TempatLahir>'',0,1)+if(TanggalLahir>'',0,1)+if(
	NomorKTPWNI>'',0,1)+if(TanggalDikeluarkan>'',0,1)+if(TempatDikeluarkan>'',0,1)+if(TanggalBerakhir>'',0,1)+if(
	Alamat>'',0,1)+if(Telepon>'',0,1)+if(StatusSipilID,0,1)+if(
	PekerjaanID>'',0,1)+if(Pekerjaan>'',0,1)+if(NamaAlamatKantor>'',0,1)+if(TeleponKantor>'',0,1)+if(
	NamaIbu>'',0,1)+if(KewarganegaraanIbu>'',0,1)+if(TempatLahirIbu>'',0,1)+if(TanggalLahirIbu>'',0,1)+if(
	NamaAyah>'',0,1)+if(KewarganegaraanAyah>'',0,1)+if(TempatLahirAyah>'',0,1)+if(TanggalLahirAyah>'',0,1)+if(
	AlamatOrangTua>'',0,1)+if(TeleponOrangTua>'',0,1)+if(
	NamaPasangan>'',0,1)+if(KewarganegaraanPasangan>'',0,1)+if(TempatLahirPasangan>'',0,1)+if(TanggalLahirPasangan>'',0,1) into @r 
from profil where UserID = 12;