# Sistem Informasi Transparansi Peradilan di Indonesia

## Tutorial Install
1. Install Node JS terlebih dahulu https://nodejs.org/en/download/
2. Kemudian clone project
3. Menggunakan powershell atau terminal masuk ke direktori project (fyi command di powershell sekarang mirip command di terminal linux)
4. kemudian lakukan perintah
```
npm install
```
5. Tunggu sampai proses selesai
7. Pastikan di Komputer sudah terinstal MSSQL dan sudah ada Database barnama PeradilanIndonesia
8. Tambahkan Login pada Microsof SQL SERVER dengan nama peradilan_indo dan password 'password123' tanpa tanda petik
9. Tambahkan user dengan nama sesuka anda dan dengan login peradilan_indo di Database PeradilanIndonesia. Beri hak akses atau membership sebagai db_datawriter dan db_datareader
10. Kemudian lakukan perintah
```
npm run dev
```
11. Buka alamat http://localhost:5000 pada browser 