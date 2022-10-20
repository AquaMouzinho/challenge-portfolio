import { campoCerto, campoErrado } from './app.js'

export function valida(input, isTextArea) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (isTextArea) {
    if (input.validity.valid) {
      input.parentElement.classList.remove('formulario__textArea--invalido');
      input.parentElement.querySelector('.formulario__textArea--msgErro').innerHTML = '';
      campoCerto(tipoDeInput);
    } else {
      input.parentElement.classList.add('formulario__textArea--invalido');
      input.parentElement.querySelector('.formulario__textArea--msgErro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
      campoErrado(tipoDeInput);
    }
  } else {
    if (input.validity.valid) {
      input.parentElement.classList.remove('formulario__input--invalido');
      input.parentElement.querySelector('.formulario__input--msgErro').innerHTML = '';
      campoCerto(tipoDeInput);
    } else {
      input.parentElement.classList.add('formulario__input--invalido');
      input.parentElement.querySelector('.formulario__input--msgErro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
      campoErrado(tipoDeInput);
    }
  }
}

const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooLong',
  'customError'
];

const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo nome não pode ficar em branco.',
    tooLong: 'O campo nome deve conter no máximo 50 caracteres.',
    customError: 'O campo nome deve conter no máximo 50 caracteres.'
  },
  email: {
    valueMissing: 'O campo email não pode ficar em branco.',
    typeMismatch: 'O email digitado não é válido.',
    patternMismatch: 'O email digitado não é válido.'
  },
  assunto: {
    valueMissing: 'O campo assunto não pode estar vazio.',
    tooLong: 'O campo assunto deve conter no máximo 50 caracteres.'
  },
  mensagem: {
    valueMissing: 'O campo mensagem não pode estar vazio.'
  }
};

const validadores = {
  nome: input => validaNome(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = '';
  tiposDeErro.forEach(erro => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });
  return mensagem;
}

function validaNome(input) {
  const nomeRecebido = input.value.trim()
  let mensagem = '';

  if (nomeRecebido.length >= 50) {
    mensagem = 'O campo nome deve conter no máximo 50 caracteres.';
  }

  input.setCustomValidity(mensagem);
}