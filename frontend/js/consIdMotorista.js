const btn_consultarId = document.getElementById('btn_consultarId')
const resposta = document.getElementById('resposta')

btn_consultarId.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const codigo = document.getElementById('codigo').value

    fetch(`http://localhost:3000/motoristas/${encodeURIComponent(codigo)}`,{
        headers: {'Authorization': token}
    })

    .then(tratarSessao)
    .then(dados => {
        if(!dados.codMotorista){
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }
        resposta.innerHTML = tabelaMotoristas([dados])
    })
    .catch((err)=>{
        console.error('Erro ao consultar Motorista:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
