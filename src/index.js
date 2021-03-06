const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const socket = require('socket.io');
const { Server } = require('http');

const routes = require('./routes');

const app = express();
const server = Server(app);
const io = socket(server);

app.use(morgan('dev'));
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server start on port: ', PORT));
