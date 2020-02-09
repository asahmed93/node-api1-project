// implement your API here
const express = require('express')

const server = express();

const Hubs = require('./data/db.js')

//Create


//Read
server.get('/api/users', (req, res) => {
    // read data from database
    Hubs.find() // return a promise
     .then(hubs => {
         res.status(200).json(hubs)
     })
     .catch( error => {
         console.log(error)
         res.status(500).json({ Error: "Error getting the list of users"})
     })
})

// Update


//Delete

const port = 5000;
server.listen(port, () => console.log(`\n ** Port is Listening on: ${port} ** \n`))