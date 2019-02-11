'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUthModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('uth', {
    th: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaulValue: 0
    }
  })
}
