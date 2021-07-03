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
const dotenv = require('dotenv');

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

// app.engine('handlebars', hbs.engine);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('views/images')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

sequelize.sync({ force: false }).then(() => {
    http.listen(PORT, () => {
        console.log('listening on, ', PORT);
    })
});