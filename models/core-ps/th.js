'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupThModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('th', {
    th: {
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
