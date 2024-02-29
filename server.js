const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageSection = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test321',
        database: 'smart-brain'
    }
});


app.use(express.json()); // body parser since it's included in Express.js framework
app.use(cors());

app.get('/', (req, res) => { res.send('success'); })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { imageSection.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { imageSection.handleApiCall(req, res) })

    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     } 
    // })

    // if (!found) {
    //     res.status(400).json('not found');
    // }

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('apps running on port 3000');
})


/*
/ --> res = this is working

/signin --> POST request = success/fail
/register --> POST request = user
/profile/:userId --> GET = returns user
/image --> PUT --> user


*/