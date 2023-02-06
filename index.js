//Express
const express = require('express');
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
//
const app = express();
//config
require('./config/dbConfig');


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/statics', express.static(path.resolve(__dirname + '../public')))

//Template
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//routes
app.use("/api", apiRoutes);
app.use('/', viewsRoutes);
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



