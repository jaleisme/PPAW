const admin = require("firebase-admin");
const {getDatabase} = require('firebase-admin/database');
const serviceAccount = require('./credentials.json')
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uas-paw-82bd7-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
const db = getDatabase(app)

module.exports = { db }