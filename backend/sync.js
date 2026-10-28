const {Motorista, Funcionario, Carga, Entrega} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Sincronizando as Tabelas')
    }catch(err){
        console.error('Errp ao Sincronizar as Tabelas')
    }finally{
        await conn.close()
        console.log('Tabelas Sincronizandas ')
    }
}

syncDataBase()