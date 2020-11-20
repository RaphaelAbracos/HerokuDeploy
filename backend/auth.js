const jwt = require("jsonwebtoken");
const authConfig = require("../backend/models/auth");

module.exports = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader){
  console.log("Sem Token fornecido");
  return res.status(401).send({ error: "Sem Token fornecido" });
  }
  const parts = authHeader.split(" ");

  if (!(parts.length === 2)){
    console.log("Token error");
    return res.status(401).send({ error: "Token error" });
  }
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)){
    console.log("Token Malformatted");
    return res.status(401).send({ error: "Token Malformatted" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err){
      console.log(err);
     return res.status(401).send({ error: "Token invalido" });
    }
    req.userId = decoded.id;

    console.log("ta logado");
    return next();
  });
};
