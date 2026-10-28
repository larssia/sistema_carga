const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Funcionario = db.define('Funcionario',{
    codFuncionario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'funcionarios'
})

module.exports = Funcionario