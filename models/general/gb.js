'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupGbModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('gb', {
    gb: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
