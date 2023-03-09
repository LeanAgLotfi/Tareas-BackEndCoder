//Express
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
//Path
const path = require('path');
//Rutas
const apiRoutes = require('./routes/Router');
const viewsRoutes = require('./routes/view.router');
const realtime = require('./utils/old/realTimeProducts');
//Server
const { Server } = require('socket.io');
//Puerto
const PORT = 8080;
//Mongo
const MongoStore = require('connect-mongo');
//Util
const { logGreen, logCyan, logRed } = require('./utils/console');
const app = express();
//config
require('./config/dbConfig');

const passport = require('passport');
const cookieParser = require('cookie-parser');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/statics', express.static(path.resolve(__dirname, '../public')));
app.use(session({
    name: "user",
    secret: 'top-secret-51',
    cookie: {
      maxAge: 60000 * 60,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://leli:cRcN_Hae2ZuGw98@ecommerce.oscpr3y.mongodb.net/session?retryWrites=true&w=majority',
      ttl: 60 * 60
    })
  }));

//Template
const math = helpers.math();
app.engine('handlebars', handlebars.engine({
    helpers: {
        math
    }
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//routes
app.use("/api", apiRoutes);
app.use('/', viewsRoutes);
//app.use('/app', realtime);


//Server
const server = app.listen(PORT, "127.0.0.1", () => {
  const host = server.address().address;
  const port = server.address().port;
  logGreen(`Server is up and running on http://${host}:${port}`);
});

server.on("error", (error) => {
  logRed("There was an error starting the server");
  logRed(error);
});

const io = new Server(server)

io.on('connection', (socket)=>{
  logCyan("new client connected");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('welcome', user)
        socket.broadcast.emit('new-user', user)
    })
})



