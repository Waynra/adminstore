const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.query('SELECT COUNT(*) AS total_produk FROM produk', (err, p1) => {
    db.query('SELECT COUNT(*) AS total_pembelian FROM pembelian WHERE status="aktif"', (err2, p2) => {
      res.render('dashboard', { total_produk: p1[0].total_produk, total_pembelian: p2[0].total_pembelian });
    });
  });
});

// PRODUK CRUD
app.get('/produk', (req, res) => {
  db.query('SELECT * FROM produk', (err, result) => {
    if (err) throw err;
    res.render('produk', { produk: result });
  });
});
app.get('/produk/add', (req, res) => res.render('add-produk'));
app.post('/produk/add', (req, res) => {
  const { nama, harga } = req.body;
  db.query('INSERT INTO produk (nama, harga) VALUES (?, ?)', [nama, harga], err => {
    if (err) throw err;
    db.query('INSERT INTO stock (produk_id, jumlah) VALUES (LAST_INSERT_ID(), 0)');
    res.redirect('/produk');
  });
});
app.get('/produk/edit/:id', (req, res) => {
  db.query('SELECT * FROM produk WHERE id = ?', [req.params.id], (err, result) => {
    res.render('edit-produk', { produk: result[0] });
  });
});
app.post('/produk/edit/:id', (req, res) => {
  const { nama, harga } = req.body;
  db.query('UPDATE produk SET nama=?, harga=? WHERE id=?', [nama, harga, req.params.id], err => {
    if (err) throw err;
    res.redirect('/produk');
  });
});
app.post('/produk/delete/:id', (req, res) => {
  db.query('DELETE FROM stock WHERE produk_id=?', [req.params.id]);
  db.query('DELETE FROM produk WHERE id=?', [req.params.id], err => {
    if (err) throw err;
    res.redirect('/produk');
  });
});

// STOCK
app.get('/stock', (req, res) => {
  db.query('SELECT stock.id, produk.nama, stock.jumlah FROM stock JOIN produk ON stock.produk_id = produk.id', (err, result) => {
    res.render('stock', { stock: result });
  });
});
app.post('/stock/update/:id', (req, res) => {
  const { jumlah } = req.body;
  db.query('UPDATE stock SET jumlah = ? WHERE id = ?', [jumlah, req.params.id], err => {
    if (err) throw err;
    res.redirect('/stock');
  });
});

// PEMBELIAN
app.get('/pembelian', (req, res) => {
  db.query(`SELECT pembelian.*, produk.nama FROM pembelian JOIN produk ON pembelian.produk_id = produk.id ORDER BY pembelian.id DESC`, (err, result) => {
    res.render('pembelian', { pembelian: result });
  });
});
app.get('/pembelian/add', (req, res) => {
  db.query('SELECT * FROM produk', (err, produk) => res.render('add-purchase', { produk }));
});
app.post('/pembelian/add', (req, res) => {
  const { produk_id, jumlah } = req.body;
  db.query('SELECT harga FROM produk WHERE id=?', [produk_id], (err, r) => {
    const total = r[0].harga * jumlah;
    db.query('INSERT INTO pembelian (produk_id, jumlah, total) VALUES (?, ?, ?)', [produk_id, jumlah, total]);
    db.query('UPDATE stock SET jumlah = jumlah - ? WHERE produk_id=?', [jumlah, produk_id]);
    res.redirect('/pembelian');
  });
});
app.post('/pembelian/cancel/:id', (req, res) => {
  db.query('SELECT produk_id, jumlah FROM pembelian WHERE id=?', [req.params.id], (err, r) => {
    db.query('UPDATE pembelian SET status="cancelled" WHERE id=?', [req.params.id]);
    db.query('UPDATE stock SET jumlah = jumlah + ? WHERE produk_id=?', [r[0].jumlah, r[0].produk_id]);
    res.redirect('/pembelian');
  });
});

app.listen(3000, () => console.log('🚀 Running at http://localhost:3000'));