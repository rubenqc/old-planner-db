'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupCentralizedAnalysisModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('analisis_centralizado', {
    th: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    sau: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    },
    pdp: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    },
    estado: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  })
}
