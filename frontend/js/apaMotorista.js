const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const idMotorista = document.getElementById('idMotorista').value

    if(!confirm('Excluir o motorista também exclui suas cargas e entregas. Continuar?')){
        return
    }

    fetch(`http://localhost:3000/motoristas/${encodeURIComponent(idMotorista)}`,{
        method: 'DELETE',
        headers: {'Authorization': token}
    })

    .then(tratarSessao)
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        if(dados.message.includes('sucesso')){
            document.querySelector('form').reset()
        }
    })
    .catch((err)=>{
        console.error('Erro ao excluir Motorista:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
