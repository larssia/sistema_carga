const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', ()=>{
    fetch('http://localhost:3000/cargas',{
        headers: {'Authorization': token}
    })

    .then(tratarSessao)
    .then(dados => {
        if(!Array.isArray(dados)){
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        let tabela = `<table>
            <tr><th>Código</th><th>Descrição</th><th>Peso (kg)</th><th>Volume (m³)</th><th>Código de Rastreio</th><th>Motorista</th></tr>`

        dados.forEach((el)=>{
            tabela += `<tr>
                <td>${esc(el.codCarga)}</td>
                <td>${esc(el.descricao)}</td>
                <td>${esc(el.peso)}</td>
                <td>${esc(el.volume)}</td>
                <td>${esc(el.codRastreio)}</td>
                <td>${esc(el.idMotorista)} - ${esc(el.motoristaCarga.nome)}</td>
            </tr>`
        })

        resposta.innerHTML = tabela + '</table>'
    })
    .catch((err)=>{
        console.error('Erro ao listar Cargas:', err)
        resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
    })
})
