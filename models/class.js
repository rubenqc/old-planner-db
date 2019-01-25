'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupClassModel(config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('clase', {
        clase: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}