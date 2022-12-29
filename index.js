const express = require('express');
const apiRoutes = require('./src/routes/Router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api", apiRoutes)

app.listen(8080, () => console.log('Server is up and running on port 8080'))


