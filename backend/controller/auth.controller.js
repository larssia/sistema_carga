const Funcionario = require('../models/Funcionario')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const login = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})
        if(!funcionario){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        const bytes = CryptoJs.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDescripto = bytes.toString(CryptoJs.enc.Utf8)

        if(!funcionario.senha !== senhaDescripto){
            return res.status(404).json({message: 'Senha incorreta'})
        }

        const tresHrEmMs = 3 * 60 * 60 * 1000
        const tempoExpirar = Date.now() + tresHrEmMs

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expirarEm: tempoExpirar
        }

        const token = CryptoJs.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao realizar o Login'})
    }
}

module.exports = {login}