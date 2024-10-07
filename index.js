const express = require('express');
const app = express();
const fs = require('fs');  // for reading the user.json file
const path = require('path');  // for serving the home.html file
const bodyParser = require('body-parser');  // to handle JSON body

app.use(bodyParser.json());

const router = express.Router();


router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});


router.get('/profile', (req, res) => {
    fs.readFile('./user.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading user data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('./user.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading user data');
        } else {
            const user = JSON.parse(data);
            if (username === user.username) {
                if (password === user.password) {
                    res.json({ status: true, message: "User is valid" });
                } else {
                    res.json({ status: false, message: "Password is invalid" });
                }
            } else {
                res.json({ status: false, message: "User Name is invalid" });
            }
        }
    });
});


router.get('/logout', (req, res) => {
    const { username } = req.query;
    if (username) {
        res.send(`<b>${username} successfully logged out.</b>`);
    } else {
        res.send('<b>Username not provided</b>');
    }
});


app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8081, () => {
    console.log('Web Server is listening at port ' + (process.env.port || 8081));
});
