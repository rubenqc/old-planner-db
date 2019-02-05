'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupDatacenterMainModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('dc_principal', {
    dc_principal: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
