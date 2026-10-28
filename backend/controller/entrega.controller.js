const Carga = require('../models/Carga')
const Entrega = require('../models/Entrega')

const cadastrar = async(requ,res)=>{
    const valores = requ.body

    if(!valores.idCarga || !valores.cidade || !valores.status || !valores.data || !valores.hora){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        await Entrega.create()
        return res.status(201).json({message: 'Dados cadastrado com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados!'})
    }
}

const listar = async(requ,res)=>{
    try{
        const entrega = await Entrega.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Carga,
                    as: 'entregaCarga',
                    attributes: ['codCarga', 'descricao', 'peso', 'volume', 'codRastreador']
                }
            ]
        })
        return res.status(200).json(entrega)
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar dados!'})
    }
}

const atualizar = async(requ,res)=>{
    const id = requ.params.id
    const valores = requ.body

    try{
        const entrega = await Entrega.findByPk(id)
        if(!entrega){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        const carga = await Carga.findByPk(id)
        if(!carga){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        await Entrega.update(valores,{where: {codMotorista: id}} )
        return res.status(200).json({message: 'Dados atualizados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados!'})
    }
}

module.exports = {cadastrar, listar, atualizar}