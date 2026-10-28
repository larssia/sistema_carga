const verificar_log = document.getElementById('verificar_log')
const token = localStorage.getItem('token')
const nome = localStorage.getItem('nomeFuncionario')

if(token){
    verificar_log.innerHTML = `<a href="#" id="btn_logout">Logout</a> &emsp;`
    verificar_log.innerHTML += `<span class="titulo_menu">Funcionário: </span>`

    const nomeLogado = document.createElement('span')
    nomeLogado.className = 'titulo_menu'
    nomeLogado.textContent = nome
    verificar_log.appendChild(nomeLogado)

    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', ()=>{
        localStorage.clear()
        location.reload()
    })
}else{
    verificar_log.innerHTML = `<a href="./html/login.html">Login</a>`
}
