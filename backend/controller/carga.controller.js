const Motorista = require('../models/Motorista')
const Carga = require('../models/Carga')

const cadastrar = async(requ,res)=>{
    const valores = requ.body

    if(!valores.idCliente || !valores.descricao || !valores.peso || 
        !valores.volume || !valores.codReatreador){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const motorista = await Motorista.findByPk(valores.id)
        if(!motorista){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        await Carga.create(valores)
        return res.status(201).json({message: 'Dados cadastrado com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados!'})
    }
}

module.exports = {cadastrar}