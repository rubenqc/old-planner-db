'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupDateModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('fecha', {
    fecha: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    factor_s: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
}
