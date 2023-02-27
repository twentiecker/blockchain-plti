## Modul 1 Pembuatan Rantai Block

Praktikum ini bertujuan untuk memandu mahasiswa dalam membuat Rantai Block dari sebuah
Blockchain Network.

Pembahasan:

1. Set Up Blockchain Environment
2. Build a Blockchain in the object-oriented programming style.
3. Generate hashes for blocks in the chain.
4. Unit Test Components of the Blockchain.
5. Create an API around the Blockchain.

Tools yang digunakan:

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Node Js](https://nodejs.org/en/download/)
3. [Postman](https://www.postman.com/downloads/)

## Instalasi

```
npm install
```

## Menjalankan Program

```
npm run dev
```

## Simulasi Postman

Mendapatkan data blokchain

```
GET localhost:3001/blocks
```

Menambah blok pada blokchain

```
POST localhost:3001/mine
```

Pada saat menambah blok, perlu menyertakan "body" untuk menambahkan nilai "data". Pengiriman request tanpa mennyertakan data akan menyebakan isian data pada blok bernilai "undefined". Format yang akan dituliskan pada body menggunakan format penulisan JSON, oleh karena itu pilih type "JSON" pada format penulisan body dan pilih opsi "raw" dalam menuliskannya. Berikut contoh isian "body" pada postman

```
{
    "data": {
        "to": "lukman",
        "message":"hallo lukman"
    }
}
```
