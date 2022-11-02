'use strict'

const limparFormulario = () =>{
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}


const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}


const eNumero = (numero) => /^[0-9]+$/.test(numero)

const cepValido = (cep) => cep.length == 8 && eNumero(cep) 

const pesquisarCep = async() => {
    limparFormulario()
    
    const nome = document.getElementById('nome').value
    const cep = document.getElementById('cep').value.replace("-","")
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)){
        const dados = await fetch(url)
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('status').textContent = `CEP não encontrado! ${nome}`
        }else {
            document.getElementById('status').textContent = `Parece tudo certo :-) ${nome}`
            preencherFormulario(endereco)
        }
    }else{
        document.getElementById('status').textContent = `CEP incorreto!  ${nome}`
    }
     
}

document.getElementById('btn')
    .addEventListener('click', pesquisarCep)