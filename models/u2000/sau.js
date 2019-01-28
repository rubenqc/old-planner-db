'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUsauModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sau', {
    sau: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  })
}
