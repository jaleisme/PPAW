const express = require('express');
const app = express();
const postgresPool = require('pg').Pool;

const pool = new postgresPool({
    user: 'admin',
    host: '194.233.91.96',
    database: 'perpustakaan',
    password: 'admin',
    port: 3333,
})

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get('/', (req, res) => {
    let dataBuku
    pool.query('select * from app.buku', (error, result)=>{
        if(error){
            throw error
        }
        // res.status(200).json(result.rows)
        res.render('index.ejs', {dataBuku:result.rows})
    })
})

app.get('/tambah-buku', (req, res) => {
    res.render('tambah_buku.ejs')
})

app.post('/simpan-buku', (req,res) => {
    let namaBuku = req.body.nama_buku
    pool.query('insert into app.buku (nama_buku) values ($1)', [namaBuku], (error, result)=>{
        if(error){
            throw error
        }
        // res.status(200).json(result.rows)
        res.redirect('/')
    })
})