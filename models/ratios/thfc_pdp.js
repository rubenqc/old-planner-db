'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupThfcPdpModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('thfc_pdp', {
    thfc_pdp: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  })
}
