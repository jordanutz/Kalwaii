const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is kickin')
})

PORT = 6500;

app.listen(PORT, ()=> {
  console.log(`Blasting off on Port ${PORT}`)
})
