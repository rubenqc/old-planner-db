'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupThfcPdpModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('thfc_pdp', {
    thfc_pdp: {
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
