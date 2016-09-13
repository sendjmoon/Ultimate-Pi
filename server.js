'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/build`));

app.listen(port, function(){
  console.log('server up on', port);
});
