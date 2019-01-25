'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTrafficModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('trafico', {
    trafico: {
      type: Sequelize.DOUBLE,
      allosNull: false
    }
  })
}
