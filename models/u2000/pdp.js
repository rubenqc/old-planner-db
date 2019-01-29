'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUpdpModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('updp', {
    pdp: {
      type: Sequelize.DOUBLE.UNSIGNED,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  })
}
