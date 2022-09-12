const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

require('./routes/getNetworks')(app);
require('./routes/addNetworks')(app);
require('./routes/modifyNetworks')(app);
require('./routes/getStations')(app);

// server
app.listen(process.env.PORT, () => {
  console.log(`Application launched on port ${PORT}`);
});
