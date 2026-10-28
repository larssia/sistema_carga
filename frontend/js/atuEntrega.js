const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const codEntrega = document.getElementById('codEntrega').value

    const valores ={
        idCarga: document.getElementById('idCarga').value,
        cidadeDestino: document.getElementById('cidadeDestino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value
    }

    Object.keys(valores).forEach((k)=>{
        if(!valores[k]){
            delete valores[k]
        }
    })

    fetch(`http://localhost:3000/entregas/${encodeURIComponent(codEntrega)}`,{
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
        console.error('Erro ao atualizar Entrega:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
