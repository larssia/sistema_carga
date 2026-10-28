const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('Carga',{
    codCarga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idMotorista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'motoristas',
            key: 'codMotorista'
        }
    },
    descricao: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    volume: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    codRastreador: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'cargas'
})

module.exports = Carga