



const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const imagesRouter = require('../images/image-router');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter);
server.use('/api/images', authenticate, imagesRouter);

module.exports = server;