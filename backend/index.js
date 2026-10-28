const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioCrontroller = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
require('./models/rel')

//----------- Middleware ----------------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//----------- Rotas Públicas  ----------------

app.post('/funcionario', funcionarioCrontroller.cadastrar)

app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando'})
})

//----------- Rotas Privadas  ----------------
//Motorista
app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motoristas/buscarNome/:id', motoristaController.consultar)
app.put('/motoristas/:id', motoristaController.atualizar)
app.delete('/motoristas/:id', motoristaController.apagar)

//Carga
app.post('/carga', cargaController.cadastrar)

//Motorista
app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.put('/entregas/:id', entregaController.atualizar)

//----------- Server  ----------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao rodar o servidor!', err)
})