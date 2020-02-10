// implement your API here
const express = require('express')

const server = express();

server.use(express.json())

const Users = require('./data/db.js')


//Create

server.post('/api/users', (req, res) => {
    const userData = req.body;
    
    
    if(!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {Users.insert(userData)
    .then(user => {
        res.status(201).json(user)
    })
    .catch( error => {
        console.log(error);

        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    })}
})

//Read
server.get('/api/users', (req, res) => {
    // read data from database
    Users.find() // return a promise
     .then(users => {
         res.status(200).json(users)
     })
     .catch( error => {
         console.log(error)
         res.status(500).json({ errorMessage: "The users information could not be retrieved."})
     })
})

// Update


//Delete

const port = 5000;
server.listen(port, () => console.log(`\n ** Port is Listening on: ${port} ** \n`))