const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  sobrenome: {type: String, required: false, default: ''},
  telefone: {type: String, required: false, default: ''},
  email: {type: String, required: false, default: ''},
  dataCadastro: {type: Date, default: Date.now}
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();

  if(this.errors.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function () {
  this.cleanUp();

  if(!this.body.nome) this.errors.push('Nome não pode ficar em branco!');
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
  if(!this.body.email && !this.body.telefone) {
    this.errors.push('Necessário informar telefone ou email do contato');
  }
}

Contato.prototype.cleanUp = function() {
  for(let key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    telefone: this.body.telefone,
    email: this.body.password   
  }
}

module.exports = Contato; 