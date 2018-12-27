# QUICKPASS

Merupakan aplikasi web yang dibangun untuk mempercepat proses permohonan pembuatan paspor.
Aplikasi ini dibuat untuk menyelesaikan tugas akhir dari mata kuliah kami yaitu Pemrograman Web, yang mana kami ditantang untuk membangun sebuah web tanpa menggunakan framework (dan library?)

## Requirements

HTML, CSS, Javascript, PHP, MySQL, dan Python 3.x.

Untuk bagian frontend-nya, dibangun dalam tiga bahasa dasar HTML, CCSS, dan Javascript.
Sedangkan untuk bagian backend, digunakan bahasa PHP disertai MySQL sebagai DBMS-nya (XAMPP).
Python digunakan untuk merubah relative link.

## Prepare

Kode yang kami buat sudah diadaptasi untuk diunggah di server sehingga ada link yang rusak jika digunakan pada Localhost.

Pada server url yang dipakai adalah

```
quick-pass.herokuapp.com
```

Sedangkan pada XAMPP

```
localhost/quickpass/
```

Sehingga jika pada suatu kode dalam script menggunakan relative link "`/`", pada masing-masing kasus, sejatinya program akan merujuk ke

```
Server:
    quick-pass.herokuapp.com
XAMPP:
    localhost
```

Terlihat perbedaan pada saat digunakan di lokal, program tidak akan merujuk ke `localhost/quickpass/` melainkan hanya sampai ke `localhost`.

Oleh sebab itu, kami membuat sebuah python script untuk mengatasi hal tersebut, `change_to_local.py`.

### Penggunaan

Untuk penggunaan di localhost, cukup jalankan dengan perintah dasar:

```
$ python change_to_local.py
```

Jika ingin merubah kembali untuk siap diunggah ke server, tambahkan argumen berikut:

```
$ python change_to_local.py -s
```

atau:

```
$ python change_to_local.py --server
```

### Alternatif

Selain menggunakan python script kami, anda juga bisa membuat virtual host pada XAMPP.
Untuk langkah-langkah pembuatannya bisa dilihat disini

https://stackoverflow.com/a/36572751

Jangan lupa untuk merestart apache pada XAMPP setelah melakukan perubahan.

## Disclaimer

Kami masih pemula pada saat pembuatan aplikasi ini.
