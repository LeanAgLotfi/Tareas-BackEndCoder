const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const apiRoutes = require('./routes/Router');
const viewsRoutes = require('./routes/realTimeProducts');
const { Server } = require('socket.io');
const PORT = 8080;
const app = express();

//Template
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + 'src/views')
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/statics', express.static(path.resolve(__dirname, 'src/public')))
app.use("/api", apiRoutes);
app.use('/', viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log('Server is up and running on port 8080')
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado');
})




