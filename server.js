require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8001
const serveIndex = require('serve-index');
const cors = require('cors')

const db = require("./models/index");
app.use(cors())
app.options('*', cors()) 

db.sequelize.sync().then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


app.use('/public', express.static('public'), serveIndex('public', {'icons': true}));
//cors

//body-parser express
app.use(express.json({ limit: '2048mb' }))
app.use(express.urlencoded({ extended: true }))

//routers in index.js
const router = require('./routes/index')
app.use('/', router)

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`Server running on port ${PORT}`)
})