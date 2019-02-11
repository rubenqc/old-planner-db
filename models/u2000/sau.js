'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUsauModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('usau', {
    sau: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
}
