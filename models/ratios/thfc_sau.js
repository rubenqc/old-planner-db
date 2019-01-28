'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupThfcSauModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('thfc_sau', {
    thfc_sau: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  })
}
