//server.js
console.log('May Node be with you')


// server.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const connectionString = 'mongodb+srv://phucthien2002:devilporo123@cluster0.bnofda1.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        const db = client.db('testcruddb')
        const quotesCollection = db.collection('quotes')

        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }))


        app.set('view engine', 'ejs')

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))

            // ...
            //res.sendFile(__dirname + '/index.html')
        })

        // get <form action="/quotes" method="POST"> from index.html after submission
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        /*
                // All your handlers here...
                app.get('/', (req, res) => {
                    res.sendFile(__dirname + '/index.html')
                    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
                    // Mine was '/Users/zellwk/Projects/demo-repos/crudexpress-mongo' for this app.
                })
        */

        app.listen(process.env.PORT || 3000, function () {
            console.log('listening on 3000')
        })


    })
    .catch(error => console.error(error))