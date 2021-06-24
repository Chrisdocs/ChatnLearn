const helpers = require('./utils/helpers');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3001;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const {
    Server
} = require("socket.io");

app.use(session(sess));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.use(routes);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});


sequelize.sync({ force: false }).then(() => {
    http.listen(PORT, () => {
        console.log('listening on *:3001');
    })
});
// Dependencies
// =============================================================

// Sets up the Express App
// =============================================================

// Set Handlebars as the default template engine.


// Routes
// =============================================================
// GET route for getting all of the ice cream flavors
app.get('/', (req, res) => {
    res.render('all');
});
// Create a route for getting a specific ice cream flavor
app.get('/login', (req, res) => {
    return res.render('login');
});
// Starts the server to begin listening
// =============================================================
// app.listen(3004, () => {
//     console.log('Server listening on: http://localhost:' + 3001);
// });