const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'Acesso Negado!'})
    }

    try{
        const bytes = CryptoJs.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescripto = bytes.toString(CryptoJs.enc.Utf8)

        if(!dadosDescripto){
            return res.status(401).json({message: 'Token inválido'})
        }

        const payload = JSON.parse(dadosDescripto)

        if(Date.now() > payload.expirarEm){
            return res.status(401).json({message: 'Sessão expirada'})
        }

        req.usuario = payload
        next()
    }catch(err){
        return res.status(401).json({message: 'Erro na autenticação'})
    }
}

module.exports = authMiddleware