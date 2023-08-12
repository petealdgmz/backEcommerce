require('dotenv').config()

const express = require ('express')
const bodyParser = require("body-parser")
const {databaseService} = require('./src/services/databaseService')
const fs = require('fs')

const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000
require('./src/routes/routes')(app, databaseService(), fs)


app.listen(PORT, () => {
    console.log(`Activo en el puerto ${PORT}`)
})
