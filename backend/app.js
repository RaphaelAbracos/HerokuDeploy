const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Usuario = require("./models/usuario");
const mongoose = require("mongoose");

const authConfig = require("../backend/models/auth");
const autMiddleware = require("./auth.js");

const cors=require('cors');



const jwt = require("jsonwebtoken");
app.use(bodyParser.json());

mongoose
  .connect(
    //"mongodb://admin:usabilidade123@cluster0-shard-00-00.sqgup.mongodb.net:27017,cluster0-shard-00-01.sqgup.mongodb.net:27017,cluster0-shard-00-02.sqgup.mongodb.net:27017/Usuario?ssl=true&replicaSet=atlas-122jfs-shard-0&authSource=admin&retryWrites=true&w=majority",
    "mongodb://admin:bruno123456@cluster0-shard-00-00.gnygv.mongodb.net:27017,cluster0-shard-00-01.gnygv.mongodb.net:27017,cluster0-shard-00-02.gnygv.mongodb.net:27017/Usuario?ssl=true&replicaSet=atlas-y5d7ev-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conexão OK");
  })
  .catch(() => {
    console.log("Conexão NOK");
  });

const usuario = [];

app.use(cors({origin:true,credentials: true}));

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

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

app.post("/logar", async (req, res, next) => {
  try {
    console.log("rafael é feio");
    const { email, senha } = req.body;

    const user = await await Usuario.findOne({ email });

    if (!user) return res.status(400).send({ error: "usuario não encontrado" });

    if (senha != user.senha)
      return res.status(400).send({ error: "Senha Invalida" });

    user.senha = undefined;
//, nome: user.nome,  email
    const token = jwt.sign({ id: user.id}, authConfig.secret, {
      expiresIn: 86400,
    });

    console.log(user.id);

    res.send({ user, token: generateToken({ id: user.id }) });

    
  } catch (err) {
    next(err);
  }
});

//const total;
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

//A PARTIR DAQUI VALIDA SESSAO
app.use(autMiddleware);

app.use("/bruno", (req, res, next) => {
  res.send({ ok: true, nome: req.userId });
});

module.exports = app;
