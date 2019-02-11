'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../lib/db')

module.exports = function setupCentralizedAnalysisModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('analisis_centralizado', {
    th: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sau: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pdp: {
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
