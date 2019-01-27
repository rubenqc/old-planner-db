'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupDatacenterModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('datacenter', {
    datacenter: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
