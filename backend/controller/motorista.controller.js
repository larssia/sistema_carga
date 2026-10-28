const Motorista = require('../models/Motorista')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(requ,res)=>{
    const valores = requ.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'CPF inválido'})
    }

    if(valores.cnh.length !== 11){
        return res.status(400).json({message: 'CNH inválido'})
    }

    try{
        const cpfCrypto = CryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const cnhCrypto = CryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCrypto,
            cpf: cpfCrypto,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Dados cadastrado com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados!'})
    }
}

const listar = async(requ,res)=>{
    try{
        const motorista = await Motorista.findAll()
        let resultado = []

        motorista.forEach((el)=>{
            let cpfDescripto = ''
            let cnhDescripto = ''
            try{
                const bytesCPF = CryptoJs.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescripto = bytesCPF.toString(CryptoJs.enc.Utf8)

                const bytesCNH = CryptoJs.AES.decrypt(el.cnh, CHAVE_SECRETA)
                cnhDescripto = bytesCNH.toString(CryptoJs.enc.Utf8)
            }catch(err){
                return res.status(500).json({message: 'Erro ao Descriptografar!'})
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescripto,
                cpf: cpfDescripto,
                telefone: el.telefone
            })
        })

        return res.status(200).json({message: 'Dados cadastrado com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar dados!'})
    }
}

const consultar = async(requ,res)=>{
    const id = requ.params.id

    try{
        const motorista = await Motorista.findOne({where: {nome: nome}})
        if(!motorista){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        const bytesCPF = CryptoJs.AES.decrypt(motorista.cpf, CHAVE_SECRETA)
        const cpfDescripto = bytesCPF.toString(CryptoJs.enc.Utf8)

        const bytesCNH = CryptoJs.AES.decrypt(motorista.cnh, CHAVE_SECRETA)
        const cnhDescripto = bytesCNH.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescripto,
            cpf: cpfDescripto,
            telefone: motorista.telefone
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao consultar dados!'})
    }
}

const atualizar = async(requ,res)=>{
    const id = requ.params.id
    const valores = requ.body

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        let dadosAtualizados = ''

        if(!valores.cpf){
            if(valores.cpf.length !== 11){
                return res.status(404).json({message: 'CPF inválido'})
            }
            dadosAtualizados.cpf = CryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }

        if(!valores.cnh){
            if(valores.cnh.length !== 11){
                return res.status(404).json({message: 'CNH inválido'})
            }
            dadosAtualizados.cnh = CryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        }

        await Motorista.update(dadosAtualizados,{where: {codMotorista: id}} )
        return res.status(200).json({message: 'Dados atualizados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados!'})
    }
}

const apagar = async(requ,res)=>{
    const id = requ.params.id
    const valores = requ.body

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        await Motorista.destroy({where: {codMotorista: id}} )
        return res.status(200).json({message: 'Dados apagados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao apagar dados!'})
    }
}

module.exports = {cadastrar, listar, consultar, atualizar, apagar}