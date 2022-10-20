import { valida } from './validacao.js';

const inputs = document.querySelectorAll('input');
const textArea = document.getElementById('corpoTexto');
const botaoFormulario = document.getElementById('btnFormulario');
var listaDePreenchidos = new Array();

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    valida(evento.target, false);
  });
})

textArea.addEventListener('blur', (evento) => {
  valida(evento.target, true);
});

botaoFormulario.addEventListener('click', (evento) => {
  let link = `mailto:marino.mouzinho@hotmail.com?cc=${document.getElementById('email').value}&subject=${encodeURIComponent(document.getElementById('nome').innerText + ' - ' + document.getElementById('assunto').innerText)}&body=${encodeURIComponent(document.getElementById('corpoTexto').value)}`;
  window.location.href = link;
});

export function campoErrado(nomeCampo) {
  for (let i = 0; i < listaDePreenchidos.length; i++) {
    if (listaDePreenchidos[i] == nomeCampo) {
      listaDePreenchidos.splice(i, 1);
      botaoFormulario.disabled = true;
    }
  }
}

export function campoCerto(nomeCampo) {
  if (!listaDePreenchidos.includes(nomeCampo)) {
    listaDePreenchidos.push(nomeCampo);
  }

  if (listaDePreenchidos.length == 4) {
    botaoFormulario.disabled = false;
  }
}