## Tugas Besar Pembuatan Rantai Block E-Voting

Tools yang digunakan:

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Node Js](https://nodejs.org/en/download/)
3. [Postman](https://www.postman.com/downloads/)

## Instalasi

```
npm install
```

## Menjalankan Program (Development)

```
npm run dev
```

## Menjalankan Program (Production)

```
npm run start
```

## Simulasi Postman

Mendapatkan data blokchain

```
GET localhost:3001/blocks
```

Melakukan transaksi

```
POST localhost:3001/transact
```

Mining data transaksi

```
GET localhost:3001/mine-transactions
```

Mendapatkan data transaksi yang sedang berjalan

```
GET localhost:3001/transactions
```

Pada saat melakukan transaksi, perlu menyertakan "body" untuk menambahkan nilai "data". Format yang akan dituliskan pada body menggunakan format penulisan JSON, oleh karena itu pilih type "JSON" pada format penulisan body dan pilih opsi "raw" dalam menuliskannya. Berikut contoh isian "body" pada postman

```
{
    "recipient": <public_key>,
    "amount1": <number, default value = 0>,
    "k11": <number, default value = 0>,
    "k21": <number, default value = 0>,
    "k31": <number, default value = 0>,
    "amount2": <number, default value = 0>,
    "k12": <number, default value = 0>,
    "k22": <number, default value = 0>,
    "k32": <number, default value = 0>
}
```
