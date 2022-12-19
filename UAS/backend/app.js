const express = require("express");
// const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
// const { db } = require("./db-config.js");
const multer = require('multer');
const app = express();
const upload = multer(); 
const date = new Date();
const port = 5001; // Setting Port

// Date logic
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

// For parsing application/x-www-form-urlencoded, body, etc
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());

// Setting the app to listen on assigned port
app.listen(port, "192.168.156.130");

/** Saved-links Routes
 *  @saved-links                -> retrieve all data
 *  @saved-links/new            -> add new data
 *  @saved-links/edit/{id}      -> edit existing data (read target edit)
 *  @saved-links/update/{id}    -> update existing data
 *  @saved-links/remove/{id}    -> delete existing data
**/
app.get("/saved-links", (req, res) => {
    var multiRef = db.ref('saved-links');
    multiRef.on('value', (snapshot) => {
      const data = snapshot.val();
      res.status(200).send(data)
    });
})

app.post("/saved-links/new", (req, res) => {
    let assignedID = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
        separator: '-'
    });
    const data = {
        alias: req.body.alias,
        url: req.body.url,
        note: req.body.note,
        created_at: currentDate
    }
    try{
        db.ref('saved-links/'+assignedID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/saved-links/edit/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("saved-links").child(req.params.ID).get().then((snapshot) => {
        if (snapshot.exists()) {
            res.status(200).send(snapshot.val())
        } else {
            res.status(400).send("Data couln't be found")
        }
    }).catch((error) => {
        console.error(error);
    });
})

app.post("/saved-links/update/:ID", (req, res) => {
    const data = {
        alias: req.body.alias,
        url: req.body.url,
        note: req.body.note,
        created_at: currentDate
    }
    try{
        db.ref('saved-links/'+req.params.ID).set(data);
    } catch(err) {
        console.log(err);
        res.status(400).send(`Request failed! Here's the problem:\n${err}`);
    }
    res.status(200).send('success');
})

app.get('/saved-links/remove/:ID', (req, res) => {
    let requesting = db.ref();
    requesting.child("saved-links").child(req.params.ID).remove().then(() => {
        res.status(200).send('success');
    }).catch((error) => {
        res.status(400).send("failed");
    });
})