GO
CREATE DATABASE PeradilanIndonesia;
GO
USE PeradilanIndonesia;

GO
CREATE TABLE PELAPOR (
	IdPelapor int IDENTITY(1,1) PRIMARY KEY ,
	NamaLengkap varchar(50),
	NamaJalan varchar(50),
	Dusun varchar (20),
	RT int,
	RW int,
	Desa_Kelurahan varchar(20), 
	Kecamatan varchar (20),
	Kota_Kabupaten varchar(20),
	Provinsi varchar (20)
);
 

CREATE TABLE LEMBAGA_KEPOLISIAN(
	IdLembaga int IDENTITY(1,1) PRIMARY KEY,
	TingkatLembaga varchar(20),
	NamaLembaga varchar(50),
	NamaJalan varchar(50),
	Dusun varchar (20),
	RT int,
	RW int,
	Desa_Kelurahan varchar(20), 
	Kecamatan varchar (20),
	Kota_Kabupaten varchar(20),
	Provinsi varchar (20)
);


CREATE TABLE ADUAN_PIDANA(
	NoAduan int IDENTITY(1,1) PRIMARY KEY,
	TglAduan date,
	Perihal varchar (20),
	LokasiKejadian varchar (20),
	NamaTerlapor varchar (50),
	WaktuKejadian time,
	StatusAduan varchar(20),
	Keterangan text,
	IdLembagaKepolisian int FOREIGN KEY REFERENCES LEMBAGA_KEPOLISIAN(IdLembaga)
);

CREATE TABLE GUGATAN_PERDATA(
	NoSurat int IDENTITY(1,1) PRIMARY KEY,
	Tgl date,
	StatusGugatan varchar (20),
	LokasiKejadian varchar (20),
	IdPelapor int FOREIGN KEY REFERENCES PELAPOR(IdPelapor)
);

CREATE TABLE JAKSA(
	NIP int PRIMARY KEY ,
	NamaLengkap varchar(50),
	TTL varchar(50),
	Jenis_Kelamin varchar(20),
	Agama varchar(20),
	Pangkat varchar(50),
	Pendidikan varchar(20),
);

CREATE TABLE BERKAS_PERKARA(
	NoPerkara int IDENTITY(1,1) PRIMARY KEY,
	NIPJaksa int FOREIGN KEY REFERENCES JAKSA(NIP)
);

CREATE TABLE PENGADILAN(
	IdPengadilan int IDENTITY(1,1) PRIMARY KEY, 
	NamaPengadilan varchar(50), 
	JenisPengadilan varchar(50), 
	Tingkat varchar(20), 
	Alamat text,
	Website varchar(50), 
	Fax varchar(20) , 
	Email varchar(50)
);

CREATE TABLE SURAT_DAKWAAN(
	NoSuratDakwaan int IDENTITY(1,1) PRIMARY KEY,
	Dakwaan text,
	Tempat varchar(50),
	Tahun int,
	Tanggal date,
	IdPengadilan int FOREIGN KEY REFERENCES PENGADILAN(IdPengadilan),
);

CREATE TABLE PERSIDANGAN(
	NoSidang int IDENTITY(1,1) PRIMARY KEY,
	NoRuang int,
	Tanggal date,
	Jenis varchar(20),
	Jam time,
	Agenda text,
	Panitera varchar(50),
	IdPengadilan int FOREIGN KEY REFERENCES PENGADILAN(IdPengadilan),
);

CREATE TABLE HAKIM(
	NIP int PRIMARY KEY ,
	NamaLengkap varchar(50),
	TTL varchar(50),
	Jenis_Kelamin varchar(20),
	Agama varchar(20),
	Pangkat varchar(50),
	Pendidikan varchar(20),
);

CREATE TABLE PUTUSAN(
	NoSuratPutusan int IDENTITY(1,1) PRIMARY KEY,
	Tempat varchar(50),
	Tanggal date,
	StatusPutusan varchar(20),
	Petitum text,
	NoSidang int FOREIGN KEY REFERENCES PERSIDANGAN(NoSidang),
);

CREATE TABLE TERPERKARA(
	IdTerperkara int IDENTITY(1,1) PRIMARY KEY ,
	NamaLengkap varchar(50),
	StatusTerperkara varchar(20),
	NamaJalan varchar(50),
	Dusun varchar (20),
	RT int,
	RW int,
	Desa_Kelurahan varchar(20), 
	Kecamatan varchar (20),
	Kota_Kabupaten varchar(20),
	Provinsi varchar (20),
	NoPerkara int FOREIGN KEY REFERENCES BERKAS_PERKARA(NoPerkara),
	NoSuratPutusan int FOREIGN KEY REFERENCES PUTUSAN(NoSuratPutusan),
);

CREATE TABLE UPAYA_HUKUM(
	Nomor int IDENTITY(1,1) PRIMARY KEY,
	jenis varchar(20),
	IdTerperkara int FOREIGN KEY REFERENCES TERPERKARA(IdTerperkara),
	NIPJaksa int FOREIGN KEY REFERENCES JAKSA(NIP),
	IdPutusan int FOREIGN KEY REFERENCES PUTUSAN(NoSuratPutusan),
);

CREATE TABLE UNDANG_UNDANG(
	Nomor int , 
	Tahun int , 
	Tentang text,
	CONSTRAINT PK_UNDANG_UNDANG PRIMARY KEY(Nomor,Tahun)
);

CREATE TABLE PASAL(
	NoPasal int PRIMARY KEY,
	Isi text,
	NomorUU int,
	TahunUU int,
	CONSTRAINT FK_UNDANG_UNDANG_PASAL FOREIGN KEY (NomorUU,TahunUU) REFERENCES UNDANG_UNDANG(Nomor,Tahun)
	
);

CREATE TABLE EKSEPSI(
	IdEksepsi int IDENTITY(1,1) PRIMARY KEY,
	Tempat varchar(50),
	Tanggal date,
	Isi text,
	NoSidang int FOREIGN KEY REFERENCES PERSIDANGAN(NoSidang),
);

CREATE TABLE PRESIDEN(
	IdPresiden int IDENTITY(1,1) PRIMARY KEY, 
	Nama varchar(50),
	TanggalLahir date, 
	TempatLahir varchar(50), 
	TglMulaiMenjabat date, 
	TglSelesaiMenjabat date, 
	Agama varchar(20)
);

CREATE TABLE HAK_PREROGATIF(
	NoHakPrerogatif int IDENTITY(1,1) PRIMARY KEY,
	Jenis VARCHAR(20),
	TglDiberikan date,
	KeputusanPresiden text,
	NoSuratPutusan int FOREIGN KEY REFERENCES PUTUSAN(NoSuratPutusan),
	IdPresiden int FOREIGN KEY REFERENCES PRESIDEN(IdPresiden),
);

CREATE TABLE PEMBUATAN_ADUAN(
	IdPelapor int FOREIGN KEY REFERENCES PELAPOR(IdPelapor),
	NoAduan int FOREIGN KEY REFERENCES ADUAN_PIDANA(NoAduan),
	PRIMARY KEY(IdPelapor,NoAduan)
);

CREATE TABLE PEMBUATAN_BERKAS(
	IdKepolisian int FOREIGN KEY REFERENCES LEMBAGA_KEPOLISIAN(IdLembaga),
	NoBerkas int FOREIGN KEY REFERENCES BERKAS_PERKARA(NoPerkara),
	PRIMARY KEY(IdKepolisian,NoBerkas)
);

CREATE TABLE KELUARAN_GUGATAN(
	NIPJaksa int FOREIGN KEY REFERENCES JAKSA(NIP),
	NoSuratGugatan int FOREIGN KEY REFERENCES GUGATAN_PERDATA(NoSurat),
	PRIMARY KEY(NIPJaksa,NoSuratGugatan)
);

CREATE TABLE KELUARAN_DAKWAAN(
	NIPJaksa int FOREIGN KEY REFERENCES JAKSA(NIP),
	NoSuratDakwaan int FOREIGN KEY REFERENCES SURAT_DAKWAAN(NoSuratDakwaan),
	PRIMARY KEY(NIPJaksa,NoSuratDakwaan)
);

CREATE TABLE DAKWAAN_TERPERKARA(
	NoSuratDakwaan int FOREIGN KEY REFERENCES SURAT_DAKWAAN(NoSuratDakwaan),
	IdTerperkara int FOREIGN KEY REFERENCES TERPERKARA(IdTerperkara),
	PRIMARY KEY(NoSuratDakwaan,IdTerperkara)
);

CREATE TABLE GUGATAN_TERPERKARA(
	NoSuratGugatan int FOREIGN KEY REFERENCES GUGATAN_PERDATA(NoSurat),
	IdTerperkara int FOREIGN KEY REFERENCES TERPERKARA(IdTerperkara),
	PRIMARY KEY(NoSuratGugatan,IdTerperkara)
);

CREATE TABLE DASAR_DAKWAAN(
	NoPasal int FOREIGN KEY REFERENCES PASAL(NoPasal),
	NoSuratDakwaan int FOREIGN KEY REFERENCES SURAT_DAKWAAN(NoSuratDakwaan),
	PRIMARY KEY(NoSuratDakwaan,NoPasal)
);

CREATE TABLE DASAR_PUTUSAN(
	NoPasal int FOREIGN KEY REFERENCES PASAL(NoPasal),
	NoSuratPutusan int FOREIGN KEY REFERENCES PUTUSAN(NoSuratPutusan),
	PRIMARY KEY(NoSuratPutusan,NoPasal)
);


CREATE TABLE AJUAN_EKSEPSI(
	IdTerperkara int FOREIGN KEY REFERENCES TERPERKARA(IdTerperkara),
	IdEksepsi int FOREIGN KEY REFERENCES EKSEPSI(IdEksepsi),
	PRIMARY KEY(IdTerperkara,IdEksepsi)
);

CREATE TABLE PENGAJUAN_UPAYA_HUKUM(
	IdPelapor int FOREIGN KEY REFERENCES PELAPOR(IdPelapor),
	NomorUpayaHukum int FOREIGN KEY REFERENCES UPAYA_HUKUM(Nomor),
	PRIMARY KEY(IdPelapor,NomorUpayaHukum)
);

CREATE TABLE NOTELP_PELAPOR(
	IdPelapor int FOREIGN KEY REFERENCES PELAPOR(IdPelapor),
	NoTelp varchar(15),
	PRIMARY KEY(IdPelapor,NoTelp)
);

CREATE TABLE NOTELP_Pengadilan(
	IdPengadilan int FOREIGN KEY REFERENCES PENGADILAN(IdPengadilan),
	NoTelp varchar(15),
	PRIMARY KEY(IdPengadilan,NoTelp)
);

CREATE TABLE BUKTI_PERKARA(
	NoPerkara int FOREIGN KEY REFERENCES BERKAS_PERKARA(NoPerkara),
	Bukti varchar(100),
	PRIMARY KEY(NoPerkara,Bukti)
);

CREATE TABLE BERITA_ACARA_PERKARA(
	NoPerkara int FOREIGN KEY REFERENCES BERKAS_PERKARA(NoPerkara),
	BeritaAcara varchar(100),
	PRIMARY KEY(NoPerkara,BeritaAcara)
);

CREATE TABLE TUNTUTAN_GUGATAN(
	NoSuratGugatan int FOREIGN KEY REFERENCES GUGATAN_PERDATA(Nosurat),
	IsiTuntutan varchar(255),
	PRIMARY KEY(NoSuratGugatan,IsiTuntutan)
);

CREATE TABLE ALASAN_GUGATAN(
	NoSuratGugatan int FOREIGN KEY REFERENCES GUGATAN_PERDATA(Nosurat),
	IsiAlasan varchar(255),
	PRIMARY KEY(NoSuratGugatan, IsiAlasan)
);

CREATE TABLE SUBTUNTUTAN_GUGATAN(
	NoSuratGugatan int FOREIGN KEY REFERENCES GUGATAN_PERDATA(Nosurat),
	IsiSubTuntutan varchar(255),
	PRIMARY KEY(NoSuratGugatan, IsiSubTuntutan)
);

CREATE TABLE ISI_UPAYA_HUKUM(
	NoUpayaHukum int FOREIGN KEY REFERENCES UPAYA_HUKUM(Nomor),
	Isi varchar(255),
	PRIMARY KEY(NoUpayaHukum, Isi)
);
GO

