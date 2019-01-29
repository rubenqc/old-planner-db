'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUpdpModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('pdp', {
    pdp: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
}
