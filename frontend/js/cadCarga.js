const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const valores ={
        descricao: document.getElementById('descricao').value,
        peso: document.getElementById('peso').value,
        volume: document.getElementById('volume').value,
        codRastreio: document.getElementById('codRastreio').value,
        idMotorista: document.getElementById('idMotorista').value
    }

    fetch('http://localhost:3000/carga',{
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
        console.error('Erro ao cadastrar Carga:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
