const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('Entrega',{
    codEntrega: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idCarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cargas',
            key: 'codCarga'
        }
    },
    cidade: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("ENTREGUE", "TRANSITO"),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega