const express = require('express');
const cors = require('cors');
const app = express();
var parsers = require("./m3uParser");
var M3U = parsers.M3U;
const uploadListRoute  = require('./Router/uploadListRouter')
const userSecretRoute = require('./Router/userSecretRouter');
const listRoute = require('./Router/listRouter');
var fs = require("fs");
const path = require('path');
require('./connection')
// Define your IP address and allowed domain
const allowedIP = '192.168.31.89';
const allowedDomain = 'http://yourdomain.com';



app.use("/assets", express.static(path.join(__dirname, "assets")));
// Enable CORS only for your IP address and allowed domain
app.use(cors({
  origin: function (origin, callback) {
    if (origin === allowedDomain || origin === `http://${allowedIP}:3000`) {
      callback(null, true);
    } else {
      callback('Not allowed by CORS');
    }
  }
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use("/api/m3u", listRoute)
app.use("/api/user", userSecretRoute)
app.use("/api", uploadListRoute);
app.get('/:originalName', (req,res) => {
  const {originalName} = req.params
  try{
    res.send(M3U.parse(fs.readFileSync(path.join(__dirname, `m3ulist/${originalName}`), { encoding: "utf8" })))    
  }catch(err){
    res.status(500).json("no such file or directory")
  }
})




app.listen(8080, () => {
    console.log("port 8080")
})