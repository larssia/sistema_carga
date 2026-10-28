const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const valores ={
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch('http://localhost:3000/motorista',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(tratarSessao)
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        if(dados.message.includes('sucesso')){
            document.querySelector('form').reset()
        }
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar Motorista:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
