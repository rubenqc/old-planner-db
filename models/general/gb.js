'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupGbModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('gb', {
    gb: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER(6).UNSIGNED.ZEROFILL,
      allowNull: false
    }
  })
}
