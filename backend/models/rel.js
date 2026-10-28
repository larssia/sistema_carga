const Motorista = require('../models/Motorista')
const Carga = require('../models/Carga')
const Entrega = require('../models/Entrega')
const Funcionario = require('../models/Funcionario')

Motorista.hasMany(Carga,{
    foreignKey: 'idMotorista',
    as: 'cargaMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista, {
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    allowNull: false
})

Carga.hasMany(Entrega,{
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga, {
    foreignKey: 'idCarga',
    as: 'cargaEntrega',
    allowNull: false
})

