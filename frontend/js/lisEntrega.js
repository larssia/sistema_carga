const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', () => {
    const ordem = document.getElementById('ordem').value

    fetch(`http://localhost:3000/entregas?ordem=${ordem}`, {
        headers: { 'Authorization': token }
    })

        .then(tratarSessao)
        .then(dados => {
            if (!Array.isArray(dados)) {
                resposta.innerHTML = `<p>${dados.message}</p>`
                return
            }

            let tabela = `<table>
            <tr><th>Código</th><th>Cidade Destino</th><th>Status</th><th>Data</th><th>Hora</th><th>Carga</th><th>Código de Rastreio</th><th>Motorista</th></tr>`

            dados.forEach((el) => {
                tabela += `<tr>
                <td>${esc(el.codEntrega)}</td>
                <td>${esc(el.cidadeDestino)}</td>
                <td>${esc(el.status)}</td>
                <td>${esc(formatarData(el.data))}</td>
                <td>${esc(el.hora)}</td>
                <td>${esc(el.idCarga)} - ${esc(el.cargaEntrega.descricao)}</td>
                <td>${esc(el.cargaEntrega.codRastreio)}</td>
                <td>${esc(el.cargaEntrega.motoristaCarga.nome)}</td>
            </tr>`
            })

            resposta.innerHTML = tabela + '</table>'
        })
        .catch((err) => {
            console.error('Erro ao listar Entregas:', err)
            resposta.innerHTML += `<p>Erro ao tentar conectar com o servidor</p>`
        })
})
