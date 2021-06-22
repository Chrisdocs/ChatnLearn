const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routes = require('./controllers');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;

const {
    Server
} = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    http.listen(PORT, () => {
        console.log('listening on *:3001');
    })
});