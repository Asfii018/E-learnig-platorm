const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let users = [
    { username: 'JohnDoe', email: 'johndoe@example.com', role: 'Admin' },
    { username: 'JaneSmith', email: 'janesmith@example.com', role: 'User' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/users/:email', (req, res) => {
    const email = req.params.email;
    users = users.filter(user => user.email !== email);
    res.status(204).end();
});

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});
