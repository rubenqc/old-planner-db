'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUthModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('th', {
    th: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  })
}
