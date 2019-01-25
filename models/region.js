'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupRegionModel(config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('region',{
        region: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}