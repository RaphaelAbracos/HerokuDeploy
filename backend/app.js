const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const Usuario = require("./models/usuario");
//const Usuario = require("../src/app/Usuario/usuario.model");

mongoose.connect('mongodb+srv://admin:bruno123456@cluster0.gnygv.mongodb.net/bdProjeto?retryWrites=true&w=majority')
.then(() => {
    console.log ("Conexão OK")
    }).catch(() => {
    console.log("Conexão NOK")
    });

app.use(bodyParser.json());

const usuario = [
  {
    id: "1",
    nome: "Jose",
    fone: "11223344",
    email: "jose@email.com",
  },
  {
    id: "2",
    nome: "Jaqueline",
    fone: "22112211",
    email: "jaqueline@email.com",
  },
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  res.json(usuario);
});

app.post('/api/usuarios', (req, res, next) => {
    console.log("post");

    const usuario = new Usuario({
      nome: req.body.nome,
      senha: req.body.senha,
      email: req.body.email
    })
    usuario.save().then(usuarioInserido => {
      console.log(usuarioInserido);
      res.status(201).json({ mensagem: 'Cliente inserido', id: usuarioInserido._id })
    });
  });

module.exports = app;
