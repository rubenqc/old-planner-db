'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupSauUsersModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sau_usuarios', {
    sau_usuarios: {
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
