const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', ()=>{
    fetch('http://localhost:3000/motoristas',{
        headers: {'Authorization': token}
    })

    .then(tratarSessao)
    .then(dados => {
        if(!Array.isArray(dados)){
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }
        resposta.innerHTML = tabelaMotoristas(dados)
    })
    .catch((err)=>{
        console.error('Erro ao listar Motoristas:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
