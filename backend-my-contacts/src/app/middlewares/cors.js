module.exports = (request, response, next) => {
  // Para deixar a api aberta para todos, basta colocar um * no local da url
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Para liberar todos os metodos HTTTP, basta colocar um *
  response.setHeader('Access-Control-Allow-Credentials','true');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};
