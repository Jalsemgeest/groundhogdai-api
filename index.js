
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Routes = require('./routes');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Setting up the routes.
app.use(express.Router());
Routes.setup(app);

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();
  console.log(`Groundhog d.Ai API listening at http://${address}:${port}`);
});
