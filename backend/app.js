const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Usuario = require("./models/usuario");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://admin:usabilidade123@cluster0-shard-00-00.sqgup.mongodb.net:27017,cluster0-shard-00-01.sqgup.mongodb.net:27017,cluster0-shard-00-02.sqgup.mongodb.net:27017/Usuario?ssl=true&replicaSet=atlas-122jfs-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });
const usuario = [];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/usuarios", (req, res, next) => {
  const usuario = new Usuario({
    nome: req.body.nome,
    senha: req.body.senha,
    email: req.body.email,
  });
  usuario.save();
  console.log(usuario);
  res.status(201).json(usuario);
});

app.use("/api/usuarios", (req, res, next) => {
  //res.send("Hello from back end")
  res.status(200).json(usuario);
});
module.exports = app;
