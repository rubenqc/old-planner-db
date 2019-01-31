'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupDate (DateModel) {
  async function createOrUpdate (date) {
    const cond = {
      where: {
        fecha: date.fecha
      }
    }

    const existingDate = await DateModel.findOne(cond)

    if (existingDate) {
      const updated = await DateModel.update(date, cond)
      return updated ? DateModel.findOne(cond) : existingDate
    }

    const result = await DateModel.create(date)
    return result.toJSON()
  }

  function findAll () {
    return DateModel.findAll()
  }

  function findByDate (fecha) {
    const cond = {
      where: {
        fecha
      }
    }

    return DateModel.findOne(cond)
  }

  return {
    createOrUpdate,
    findAll,
    findByDate
  }
}
