import express from 'express';

const urlBase = "http://localhost:3000";

const host = '0.0.0.0';
const port = 4000;

const app = express();

app.use(express.static('./Views/private'));

app.get('/', (req, res) => {
  res.redirect('/cadastro_imovel.html');
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});