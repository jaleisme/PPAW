const express = require('express')
const app = express()
let task = [
    {
        subject: "PAW",
        task: "Kalkulator",
        url: "/kalkulator",
        class: "success", 
        status: "Done"
    },
    {
        subject: "PAW",
        task: "TTS",
        url: "/tts",
        class: "success", 
        status: "Done"
    }
];

app.listen(3000)

app.get('/', (request, result) => {
    result.render('dashboard.ejs', {task:task})
})
app.get('/tts', (request, result) => {
    result.render('tts.ejs')
})
app.get('/kalkulator', (request, result) => {
    result.render('kalkulator.ejs')
})