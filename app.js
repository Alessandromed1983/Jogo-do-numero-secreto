//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto'; 

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';
listaDeNumeroSorteado = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroaAleatorio();
let tentativas = 1;






function exibirTextoNaTela(tag, texto ) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female');
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');

    setTimeout(() => {
        exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
    }, 2000);

    // Fala as duas mensagens já no clique
    let mensagem = `Escolha um número entre 1 e ${numeroMaximo}`;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate: 1.2});
}


//exibirMensagemIncial()



function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagensTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagensTentativas);
       
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O numero secreto é menor');
        } else {
            exibirTextoNaTela('p','O numero secreto é maior');
        } 
        //tentativas = tentativas + 1
        tentativas++;
        limparCampo()
    }

}



function gerarNumeroaAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1); 
    let quantidadeDeElementoNaLista = listaDeNumeroSorteado.length;

    if (quantidadeDeElementoNaLista == numeroMaximo) {
        listaDeNumeroSorteado = [];
    }

    if (listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroaAleatorio();
    } else {
        listaDeNumeroSorteado.push(numeroEscolhido);
        console.log(listaDeNumeroSorteado);
        return numeroEscolhido
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';

}

function reiniciarJogo(){
    console.log('reiniciando jogo')
    numeroSecreto = gerarNumeroaAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()    

}

function iniciarJogo() {
    document.getElementById('botao-iniciar').style.display = 'none';
    exibirMensagemInicial();
}

