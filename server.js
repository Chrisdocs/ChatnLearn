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

// app.engine('handlebars', hbs.engine);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
        console.log('listening on port', PORT);
    })
});













//Whenever someone connects to chat this gets executed
io.on('connection', function(socket) {

    const id = socket.handshake.query.id
    
    socket.join(id)
    console.log('A user connected', id);
    
    socket.on('send-message', ({recipients, text})=>{
        console.log("message to send in socket on server ", text)
        recipients.forEach(recipient => {
        const newRecipients = recipients.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('receive-message', {
            recipients: newRecipients, sender: id, text
        })
    })
})


    //Whenever someone disconnects from chat this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});