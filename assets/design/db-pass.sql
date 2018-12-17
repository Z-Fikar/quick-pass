use test;
drop database if exists db_pass;
create database db_pass;
use db_pass;

create table MasterPermohonanHeader(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

create table MasterPermohonanDetail(
	ID int not null auto_increment,
	HeaderID int not null,
	Nama varchar(50) not null,
	primary key(ID)
);

create table MasterPekerjaan(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

create table MasterStatusSipil(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

create table MasterAkses(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

create table MasterLampiran(
	ID int not null auto_increment,
	Nama varchar(60) not null,
	primary key(ID)
);

create table Otentikasi(
	ID int not null auto_increment,
	AlamatEmail varchar(50) not null,
	KataSandi varchar(50) not null,
	AksesID int not null,
	SudahAktif int not null,
	primary key (ID)
);

create table Profil(
	UserID int not null,
	NamaLengkap varchar(50),
	JenisKelamin char(1),
	NamaLain varchar(50),
	TinggiBadan int,
	TempatLahir varchar(50),
	TanggalLahir date,
	
	NomorKTPWNI char(16),
	TanggalDikeluarkan date,
	TempatDikeluarkan varchar(50),
	TanggalBerakhir date,
	
	Alamat varchar(50),
	Telepon varchar(15),
	StatusSipilID int,
	
	PekerjaanID int,
	Pekerjaan varchar(50),
	NamaAlamatKantor varchar(100),
	TeleponKantor varchar(15),
	
	NamaIbu varchar(50),
	KewarganegaraanIbu varchar(50),
	TempatLahirIbu varchar(50),
	TanggalLahirIbu date,
	
	NamaAyah varchar(50),
	KewarganegaraanAyah varchar(50),
	TempatLahirAyah varchar(50),
	TanggalLahirAyah date,
	
	AlamatOrangTua varchar(50),
	TeleponOrangTua varchar(15),
	
	NamaPasangan varchar(50),
	KewarganegaraanPasangan varchar(50),
	TempatLahirPasangan varchar(50),
	TanggalLahirPasangan date,
	
	primary key (UserID)
);

create table Permohonan(
	ID int auto_increment,
	PermohonanHeaderID int,
	PermohonanDetailID int,
	PemohonID int,
	TanggalPermohonan date,

	LoketID int,
	WawancaraID int,
	
	NIKIM varchar(15),
	NIKIMPejimID int,
	NIKIMTanggal date,
	
	Kelengkapan boolean default 0,
	KelengkapanPejimID int,
	KelengkapanTanggal date,
	
	DaftarCekal boolean default 0,
	KelainanSurat boolean default 0,
	CekalKelainanPejimID int,
	CekalKelainanTanggal date,
	
	Persetujuan boolean default 0,
	KAKANIMID int,
	PersetujuanTanggal date,
	
	PasporLama varchar(50),
	PasporBaru varchar(50),
	NomorSuratPersetujuan varchar(15),
	PejimID int,
	TanggalDibuat date,
	primary key (ID)
);

create table PermohonanLampiran(
	PermohonanID int,
	LampiranID int
);

create table PermohonanCatatan(
	PermohonanID int,
	Catatan varchar(255)
);

create table Paspor(
	UserID int,
	NomorRegister varchar(50),
	NamaPemilik varchar(50),
	AlamatPemilik varchar(50),
	TanggalDibuat date,
	TanggalBerakhir date,
	TempatDikeluarkan varchar(50),
	primary key (NomorRegister)
);


alter table MasterPermohonanHeader
	add unique key (Nama);

alter table MasterPermohonanDetail 
	add foreign key (HeaderID) references MasterPermohonanHeader(ID),
	add unique key uk_MasterPermohonanDetail (HeaderID, Nama);
	
alter table MasterPekerjaan
	add unique key uk_MasterPekerjaan (nama);
	
alter table MasterStatusSipil
	add unique key (Nama);
	
alter table MasterStatusSipil
	add unique key (Nama);
	
alter table MasterAkses
	add unique key (nama);
	
alter table MasterLampiran
	add unique key (nama);
	
alter table Otentikasi
	add unique key (AlamatEmail);
	
alter table Profil
	add foreign key (UserID) references Otentikasi(ID),
	add foreign key (PekerjaanID) references MasterPekerjaan(ID),
	add foreign key (StatusSipilID) references MasterStatusSipil(ID);
	
alter table Permohonan
	add foreign key (PermohonanHeaderID) references MasterPermohonanHeader(ID),
	add foreign key (PermohonanDetailID) references MasterPermohonanDetail(ID),
	add foreign key (PemohonID) references Otentikasi(ID),
	add foreign key (LoketID) references Otentikasi(ID),
	add foreign key (WawancaraID) references Otentikasi(ID),
	add foreign key (NIKIMPejimID) references Otentikasi(ID),
	add foreign key (KelengkapanPejimID) references Otentikasi(ID),
	add foreign key (CekalKelainanPejimID) references Otentikasi(ID),
	add foreign key (KAKANIMID) references Otentikasi(ID);
	
alter table PermohonanLampiran
	add foreign key (PermohonanID) references Permohonan(ID),
	add foreign key (LampiranID) references MasterLampiran(ID),
	add unique key uk_PermohonanLampiran (PermohonanID, LampiranID);
	
alter table PermohonanCatatan
	add foreign key (PermohonanID) references Permohonan(ID),
	add unique key uk_PermohonanCatatan (PermohonanID, Catatan);
	
insert into MasterPermohonanHeader values
	(1, 'BARU'),
	(2, 'PENGGANTIAN'),
	(3, 'PERUBAHAN');
	
insert into MasterPermohonanDetail values
	(1, 1, 'Paspor 48 Hal'),
	(2, 1, 'Paspor 24 Hal'),
	(3, 1, 'SPLP'),
	(4, 2, 'Habis Berlaku'),
	(5, 2, 'Halaman Penuh'),
	(6, 2, 'Hilang'),
	(7, 2, 'Rusak'),
	(8, 2, 'Lain-lain'),
	(9, 3, 'Nama'),
	(10, 3, 'Alamat Tempat Tinggal'),
	(11, 3, 'Lain-lain');

insert into MasterPekerjaan values
	(1, 'PEJABAT NEGARA'),
	(2, 'PEGAWAI NEGERI SIPIL'),
	(3, 'TNI / POLRI'),
	(4, 'PEGAWAI SWASTA'),
	(5, 'LAINNYA');
	
insert into MasterStatusSipil values
	(1, 'KAWIN'),
	(2, 'TIDAK KAWIN'),
	(3, 'CERAI MATI'),
	(4, 'CERAI HIDUP');
	
insert into MasterAkses values
	(1, 'Administrator'),
	(2, 'Petugas Loket'),
	(3, 'Petugas Wawancara'),
	(4, 'Pegawai Tata Usaha'),
	(5, 'Pejim NIKIM'),
	(6, 'Pejim Kelengkapan'),
	(7, 'Pejim Daftar Cekal dan Kelainan Surat'),
	(8, 'Kepala Kantor Imigrasi'),
	(9, 'Pemohon');
	
insert into MasterLampiran values
	(1, 'Salinan KTP WNI'),
	(2, 'Salinan Kartu Keluarga'),
	(3, 'Salinan Akte Kelahiran/Surat Nikah/Ijazah'),
	(4, 'Paspor/SPLP Lama'),
	(5, 'Surat Keterangan Hilang dari Kepolisian'),
	(6, 'Surat Rekomendasi/Izin Atasan/Sponsor'),
	(7, 'Surat Kuasa/Kartu Tanda Pengenal Pengurusan Keimigrasian');
	
insert into Otentikasi values
	(1, 'zedd@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 1, 1),
	(2, 'anto@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 8, 1),
	(3, 'budi@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 7, 1),
	(4, 'caca@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 6, 1),
	(5, 'dudi@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 5, 1),
	(6, 'eko@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 4, 1),
	(7, 'feri@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 3, 1),
	(8, 'gea@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 2, 1),
	(9, 'ijul@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 9, 1),
	(10, 'iska@gmail.com', 'f8701e5e12e11940da9fa9d57d44d8bf', 9, 0);
	
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
	9, 'Zulfikar', 'L', 'Zedd', 175, 'Jakarta', '1997-08-13', 
	'123456789101112', '2007-08-13', 'Pamulang', '9999-12-31', 
	'Jl. Bali IV', '08123123123', 1,
	5, 'Mahasiswa', 'Gundar, Kelapa Dua', '08123456789', 
	'Nur', 'Indonesia', 'Bekasi', '1974-08-03', 
	'Cuai', 'Indonesia', 'Jakarta', '1969-10-16', 
	'JL. Bali IV', '+68123123123', 
	'Adin', 'Indonesia', 'Serpong', '1997-06-06'
);

delimiter ;;
CREATE FUNCTION `usf_Profil_CheckEmpty`(`theID` INT) RETURNS INT(1) DETERMINISTIC NO SQL SQL SECURITY DEFINER BEGIN
SELECT 
	if(UserID>'',0,1)+if(NamaLengkap>'',0,1)+if(JenisKelamin>'',0,1)+if(NamaLain>'',0,1)+if(TinggiBadan>'',0,1)+if(TempatLahir>'',0,1)+if(TanggalLahir>'',0,1)
	+if(NomorKTPWNI>'',0,1)+if(TanggalDikeluarkan>'',0,1)+if(TempatDikeluarkan>'',0,1)+if(TanggalBerakhir>'',0,1)
	+if(Alamat>'',0,1)+if(Telepon>'',0,1)+if(StatusSipilID,0,1)
	+if(PekerjaanID>'',0,1)+if(Pekerjaan>'',0,1)+if(NamaAlamatKantor>'',0,1)+if(TeleponKantor>'',0,1)
	+if(NamaIbu>'',0,1)+if(KewarganegaraanIbu>'',0,1)+if(TempatLahirIbu>'',0,1)+if(TanggalLahirIbu>'',0,1)
	+if(NamaAyah>'',0,1)+if(KewarganegaraanAyah>'',0,1)+if(TempatLahirAyah>'',0,1)+if(TanggalLahirAyah>'',0,1)
	+if(AlamatOrangTua>'',0,1)+if(TeleponOrangTua>'',0,1)
	+if(NamaPasangan>'',0,1)+if(KewarganegaraanPasangan>'',0,1)+if(TempatLahirPasangan>'',0,1)+if(TanggalLahirPasangan>'',0,1) 
INTO @r 
FROM profil WHERE UserID = theID;
    
RETURN @r;
END;;
delimiter ;
