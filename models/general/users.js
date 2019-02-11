'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupUsersModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('usuarios', {
    usuarios: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER(6).ZEROFILL.UNSIGNED,
      allowNull: false
    }
  })
}
