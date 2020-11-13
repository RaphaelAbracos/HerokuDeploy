const express = require ('express');
const app = express();

const usuario = [
{
id: '1',
nome: 'Jose',
fone: '11223344',
email: 'jose@email.com'
},
{
id: '2',
nome: 'Jaqueline',
fone: '22112211',
email: 'jaqueline@email.com'
}
]
app.use((req, res, next) => {
res.json(usuario);
});
module.exports = app;
