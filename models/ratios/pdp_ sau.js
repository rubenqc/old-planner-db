'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupPdpSauModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('pdp_sau', {
    pdp_sau: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER(6).UNSIGNED.ZEROFILL,
      allowNull: false,
      defaultValue: 0
    }
  })
}
