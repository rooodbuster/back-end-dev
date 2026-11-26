const express = require('express');
const app = express();
const sql = require('mssql'); // new line
app.get('/', (req, res) => {
res.send('Welcome to the Book Category API');
});
app.get('/about', (req, res) => {
    res.send('<p>Hello! My name is Hayden. I am a student at Ngee Ann Polytechnic studying Information Technology. I enjoy learning about programming and developing new skills in web development.</p>');
});
app.get('/categories', (req, res) => {
res.json([
{ id: 1, name: 'Fiction' },
{ id: 2, name: 'Non-Fiction' },
{ id: 3, name: 'Biography' },
{ id: 4, name: 'Science' }
]);
});

app.get('/db-test', async (req, res) => {
try {
const pool = await sql.connect({
server: 'localhost',
port: 1433,
database: 'NPBookstore',
user: 'npbookstore_user',
password: '123456',
options: { trustServerCertificate: true },
});
const result = await pool.request()
.query('SELECT COUNT(*) AS Total FROM Author');
await pool.close();
res.json({ connected: true, authors: result.recordset[0].Total });
} catch (err) {
res.status(500).json({ connected: false, error: err.message });
}
});

app.listen(3000, () => {
console.log('Listening on port 3000');
});