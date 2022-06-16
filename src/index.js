const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hola mundo')
  console.log("Hola mundo")
})

app.listen(3000)