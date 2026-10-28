const btn_consultarNome = document.getElementById('btn_consultarNome')
const resposta = document.getElementById('resposta')

btn_consultarNome.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!document.querySelector('form').reportValidity()){
        return
    }

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/motoristas/buscarNome/${encodeURIComponent(nome)}`,{
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
        console.error('Erro ao consultar Motorista por nome:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
