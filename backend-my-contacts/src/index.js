const express = require('express');
require('express-async-errors');

const app = express();

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandle = require('./app/middlewares/errorHandle');

const port = process.env.PORT || 3001

app.use(express.json());

app.use(cors);

app.use(routes);

app.use(errorHandle);

app.listen(port, () => console.log('Servidor rodando na porta http://localhost:3001'));
