const express = require('express')
const app = express()

app.listen(3000)

app.get('/', (request, result) => {
    result.render('index.ejs')
})
app.get('/tts', (request, result) => {
    result.render('tts.ejs')
})
app.get('/kalkulator', (request, result) => {
    result.render('kalkulator.ejs')
})