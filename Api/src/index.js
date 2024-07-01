const express = require("express");
const routes = require("./api/routes");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose")

app.use(express.json());

app.use(function(req, res, next){ //
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
 }); //
  
  app.use("/api", routes);

  async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/WebService', { 
        });
        console.log('MongoDB conectado');
    } catch (err) {
        console.error('Erro na conexão ao banco de dados', err);
    }
}

main();
  
  

  

  

app.listen(8080, () => {
    console.log(`APP rodando em http://localhost:8080`);
  });