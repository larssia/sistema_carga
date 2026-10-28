const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const codCarga = document.getElementById('codCarga').value

    const valores ={
        descricao: document.getElementById('descricao').value,
        peso: document.getElementById('peso').value,
        volume: document.getElementById('volume').value,
        codRastreio: document.getElementById('codRastreio').value,
        idMotorista: document.getElementById('idMotorista').value
    }

    Object.keys(valores).forEach((k)=>{
        if(!valores[k]){
            delete valores[k]
        }
    })

    fetch(`http://localhost:3000/cargas/${encodeURIComponent(codCarga)}`,{
        method: 'PUT',
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
        console.error('Erro ao atualizar Carga:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
