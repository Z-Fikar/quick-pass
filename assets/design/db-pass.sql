--user b3ec54291aa0c0
--pass 42450637
--host us-cdbr-iron-east-01.cleardb.net
--db heroku_f4b7857c0620d82
--mysql -u b3ec54291aa0c0 -h us-cdbr-iron-east-01.cleardb.net heroku_f4b7857c0620d82 -p

drop table if exists Paspor;
drop table if exists PermohonanLampiran;
drop table if exists Permohonan;
drop table if exists Profil;
drop table if exists Otentikasi;
drop table if exists MasterLampiran;
drop table if exists MasterAkses;
drop table if exists MasterStatusSipil;
drop table if exists MasterPekerjaan;
drop table if exists MasterPermohonanDetail;
drop table if exists MasterPermohonanHeader;
drop table if exists MasterStatus;

CREATE TABLE MasterStatus(
	ID int not null auto_increment,
	Nama varchar(60) not null,
	primary key(ID)
);

CREATE TABLE MasterPermohonanHeader(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

CREATE TABLE MasterPermohonanDetail(
	ID int not null auto_increment,
	HeaderID int not null,
	Nama varchar(50) not null,
	primary key(ID)
);

CREATE TABLE MasterPekerjaan(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

CREATE TABLE MasterStatusSipil(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

CREATE TABLE MasterAkses(
	ID int not null auto_increment,
	Nama varchar(50) not null,
	primary key(ID)
);

CREATE TABLE MasterLampiran(
	ID int not null auto_increment,
	Nama varchar(60) not null,
	primary key(ID)
);

CREATE TABLE Otentikasi(
	ID int not null auto_increment,
	AlamatEmail varchar(50) not null,
	KataSandi varchar(50) not null,
	AksesID int not null,
	SudahAktif int not null,
	primary key (ID)
);

CREATE TABLE Profil(
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
	
	NamaPasangan varchar(50) default "TIDAK KAWIN",
	KewarganegaraanPasangan varchar(50) default "TIDAK KAWIN",
	TempatLahirPasangan varchar(50) default "TIDAK KAWIN",
	TanggalLahirPasangan date default "9999-12-12",
	
	primary key (UserID)
);

CREATE TABLE Permohonan(
	ID int auto_increment,
	StatusID int,
	PermohonanHeaderID int,
	PermohonanDetailID int,
	PemohonID int,
	TanggalPermohonan date,

	LoketID int,
	WawancaraID int,
	CatatanWawancara text,
	
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
	Catatan text,
	primary key (ID)
);

CREATE TABLE PermohonanLampiran(
	PermohonanID int,
	LampiranID int
);

CREATE TABLE Paspor(
	UserID int,
	NomorPaspor varchar(50),
	NomorRegister varchar(50),
	NamaPemilik varchar(50),
	AlamatPemilik varchar(50),
	TanggalDibuat date,
	TanggalBerakhir date,
	TempatDikeluarkan varchar(50),
	primary key (NomorRegister)
);


ALTER TABLE MasterPermohonanHeader
	add unique key (Nama);

ALTER TABLE MasterPermohonanDetail 
	add foreign key (HeaderID) references MasterPermohonanHeader(ID),
	add unique key uk_MasterPermohonanDetail (HeaderID, Nama);
	
ALTER TABLE MasterPekerjaan
	add unique key uk_MasterPekerjaan (nama);
	
ALTER TABLE MasterStatusSipil
	add unique key (Nama);
	
ALTER TABLE MasterStatusSipil
	add unique key (Nama);
	
ALTER TABLE MasterAkses
	add unique key (nama);
	
ALTER TABLE MasterLampiran
	add unique key (nama);
	
ALTER TABLE Otentikasi
	add unique key (AlamatEmail);
	
ALTER TABLE Profil
	add foreign key (UserID) references Otentikasi(ID),
	add foreign key (PekerjaanID) references MasterPekerjaan(ID),
	add foreign key (StatusSipilID) references MasterStatusSipil(ID);
	
ALTER TABLE Permohonan
	add foreign key (StatusID) references MasterStatus(ID),
	add foreign key (PermohonanHeaderID) references MasterPermohonanHeader(ID),
	add foreign key (PermohonanDetailID) references MasterPermohonanDetail(ID),
	add foreign key (PemohonID) references Otentikasi(ID),
	add foreign key (LoketID) references Otentikasi(ID),
	add foreign key (WawancaraID) references Otentikasi(ID),
	add foreign key (NIKIMPejimID) references Otentikasi(ID),
	add foreign key (KelengkapanPejimID) references Otentikasi(ID),
	add foreign key (CekalKelainanPejimID) references Otentikasi(ID),
	add foreign key (KAKANIMID) references Otentikasi(ID);
	
ALTER TABLE PermohonanLampiran
	add foreign key (PermohonanID) references Permohonan(ID),
	add foreign key (LampiranID) references MasterLampiran(ID),
	add unique key uk_PermohonanLampiran (PermohonanID, LampiranID);
		

INSERT INTO MasterStatus values 
	(1, "Sudah mengisi formulir"),
	(2, "Sudah diperiksa dan diisi kelengkapan dokumen"),
	(3, "Sudah dibayar"),
	(4, "Sedang dilakukan Verfikasi dan Adjudikasi"),
	(5, "Penerbitan paspor"),
	(6, "Sudah diambil"),
	(7, "Dibatalkan/Dikembalikan");

INSERT INTO MasterPermohonanHeader values
	(1, 'BARU'),
	(2, 'PENGGANTIAN'),
	(3, 'PERUBAHAN');
	
INSERT INTO MasterPermohonanDetail values
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

INSERT INTO MasterPekerjaan values
	(1, 'PEJABAT NEGARA'),
	(2, 'PEGAWAI NEGERI SIPIL'),
	(3, 'TNI / POLRI'),
	(4, 'PEGAWAI SWASTA'),
	(5, 'LAINNYA');
	
INSERT INTO MasterStatusSipil values
	(1, 'KAWIN'),
	(2, 'TIDAK KAWIN'),
	(3, 'CERAI MATI'),
	(4, 'CERAI HIDUP');
	
INSERT INTO MasterAkses values
	(1, 'Administrator'),
	(2, 'Petugas Loket'),
	(3, 'Petugas Wawancara'),
	(4, 'Pegawai Tata Usaha'),
	(5, 'Pejim NIKIM'),
	(6, 'Pejim Kelengkapan'),
	(7, 'Pejim Daftar Cekal dan Kelainan Surat'),
	(8, 'Kepala Kantor Imigrasi'),
	(9, 'Pemohon');
	
INSERT INTO MasterLampiran values
	(1, 'Salinan KTP WNI'),
	(2, 'Salinan Kartu Keluarga'),
	(3, 'Salinan Akte Kelahiran/Surat Nikah/Ijazah'),
	(4, 'Paspor/SPLP Lama'),
	(5, 'Surat Keterangan Hilang dari Kepolisian'),
	(6, 'Surat Keterangan Ganti Nama'),
	(7, 'Surat Rekomendasi/Izin Atasan/Sponsor'),
	(8, 'Surat Pewarganegaraan Indonesia bagi Orang Asing WNI'),
	(9, 'Salinan KTP Ayah/Ibu WNI atau Surat Keterangan Pindah ke Luar Negeri'),
	(10, 'Surat Nikah Orang Tua'),
	(11, 'Paspor Ayah/Ibu WNI'),
	(12, 'Salinan KTP Negeri Setempat'),
	(13, 'Surat Keterangan Lahir dari Perwakilan Republik Indonesia'),
	(14, 'Surat Kuasa/Kartu Tanda Pengenal Pengurusan Keimigrasian');
	
INSERT INTO Otentikasi values
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
	'JL. Bali IV', '+628123123123', 
	'Adin', 'Indonesia', 'Serpong', '1997-06-06'
);

INSERT INTO Profil (UserID, NamaLengkap) VALUES (1, "Zedd");

INSERT INTO Paspor VALUES(9, 123, 321, "Zulfikar", "Pamulang", "2017-08-13", "2022-08-13", "Tangsel");
