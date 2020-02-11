// implement your API here
const express = require('express')

const server = express();

server.use(express.json())

const users = require('./data/db.js')


//Create

server.post('/api/users', (req, res) => {
    const userData = req.body;
    
    
    if(!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {users.insert(userData)
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
    users.find() // return a promise
     .then(user => {
         res.status(200).json(user)
     })
     .catch( error => {
         console.log(error)
         res.status(500).json({ errorMessage: "The users information could not be retrieved."})
     })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    users.findById(id)
    .then(user => {
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." , err})
    })
})

// Update

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const updates = req.body;

    if(!updates.name || !updates.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        users.update(id, updates)
        .then( user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch( err => {
            res.status(500).json({ errorMessage: "The user information could not be modified.", err})
        })
    }

})

//Delete

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    users.remove(id)
    .then( user => {
        if (!user) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else {
            res.json(user)
        }
    })
    .catch( err => {
        res.status(500).json({ errorMessage: "The user could not be removed", err })
    })
})

const port = 5000;
server.listen(port, () => console.log(`\n ** Port is Listening on: ${port} ** \n`))