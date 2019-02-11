'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupUsau (UsauModel, DateModel, ClassModel) {
  async function createOrUpdate (usau, dateA, claseA) {
    const fecha = await DateModel.findOne({
      where: { fecha: dateA }
    })

    if (!fecha) {
      return 1
    }

    const clase = await ClassModel.findOne({
      where: { clase: claseA }
    })

    if (!clase) {
      return 2
    }

    Object.assign(usau, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: usau.fechaId,
        claseId: usau.claseId,
        estado: usau.estado
      }
    }
    const existingSau = await UsauModel.findOne(cond)

    if (existingSau) {
      const updated = await UsauModel.update(usau, cond)
      return updated ? UsauModel.findOne(cond) : existingSau
    }

    const result = await UsauModel.create(usau)
    return result.toJSON()
  }

  function findAll () {
    return UsauModel.findAll({
      attributes: ['id', 'sau', 'estado'],
      group: ['id'],
      include: [
        {
          attributes: ['fecha'],
          model: DateModel
        },
        {
          attributes: ['clase'],
          model: ClassModel
        }
      ],
      raw: true
    })
  }

  async function findByRange (startDate, finalDate, clase, estado) {
    return UsauModel.findAll({
      attributes: ['sau', 'estado'],
      where: {
        estado
      },
      include: [
        {
          attributes: ['fecha'],
          model: DateModel,
          where: {
            fecha: {
              [Op.and]: {
                [Op.gte]: startDate,
                [Op.lte]: finalDate
              }
            }
          }
        },
        {
          attributes: ['clase'],
          model: ClassModel,
          where: {
            clase
          }
        }
      ],
      raw: true
    })
  }

  return {
    createOrUpdate,
    findAll,
    findByRange
  }
}
