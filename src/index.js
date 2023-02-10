//Express
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
//Path
const path = require('path');
//Rutas
const apiRoutes = require('./routes/Router');
const viewsRoutes = require('./routes/vistas/vistas');
const realtime = require('./routes/realTimeProducts');
//Server
const { Server } = require('socket.io');
//Puerto
const PORT = 8080;
//Mongo
const MongoStore = require('connect-mongo');
//
const app = express();
//config
require('./config/dbConfig');


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
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//routes
app.use("/", apiRoutes);
app.use('/api', viewsRoutes);
app.use('/app', realtime);

const httpServer = app.listen(PORT, ()=>{
    console.log('Listening on port => ', PORT)
})

const io = new Server(httpServer)


io.on('connection', (socket)=>{
    console.log("Cliente conectado");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('welcome', user)
        socket.broadcast.emit('new-user', user)
    })
})



