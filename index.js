const express = require('express');
const app = express();
const apiRoutes = require('./src/routes/Router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log('Server is up and running on port 8080'));
app.use("/api", apiRoutes);




