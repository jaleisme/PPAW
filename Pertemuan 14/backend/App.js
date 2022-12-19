const express = require('express');
const multer = require('multer');
const cors = require('cors')
const Pool = require('pg').Pool

const pool = new Pool({
    host: '194.233.91.96',
    port: '5050',
    user: 'admin',
    password: 'adminpassword',
    database: 'paw',
})

const app = express();
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log('server has been starting  at port ' + PORT);
})
app.use(cors());
app.use(express.static("public"));



const storage = multer.diskStorage(
    {
        destination: "./public/images",
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }
)
const upload = multer({storage: storage}).single('file');

app.post('/pokemon', (req,res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(408).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        pool.query("insert into app.pokemon (nama,deskripsi,path) values($1,$2,$3)",[
            req.body.nama,
            req.body.deskripsi,
            req.file.path.replace(/^\/?[^\/]+/, "")
        ],(err,result)=>{
            if(err){
                return res.status(500).json(err);
            }
            pool.query("select * from app.pokemon",(err,result)=>{
                if(err){
                    return res.status(500).json(err);
                }
                return res.status(200).json(result.rows);
            })
        });

    })
});
app.get('/pokemon',(req,res)=>{
    pool.query("select * from app.pokemon",(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(result.rows);
    })
})

app.get('/', function (req, res) {
    res.json({message: 'WELCOME'});
});


 // docker run --name postgresql-PAW -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=adminpassword -p 5050:5432 -d postgres