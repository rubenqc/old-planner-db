'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTypeModel(config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('tipo',{
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            typo: Sequelize.STRING,
            allowNull: false
        }
    })
}