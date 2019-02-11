'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupUth (UthModel, DateModel, ClassModel) {
  async function createOrUpdate (uth, dateA, claseA) {
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

    Object.assign(uth, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: uth.fechaId,
        claseId: uth.claseId,
        estado: uth.estado
      }
    }
    const existingUth = await UthModel.findOne(cond)

    if (existingUth) {
      const updated = await UthModel.update(uth, cond)
      return updated ? UthModel.findOne(cond) : existingUth
    }

    const result = await UthModel.create(uth)
    return result.toJSON()
  }

  function findAll () {
    return UthModel.findAll({
      attributes: ['id', 'th', 'estado'],
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
    return UthModel.findAll({
      attributes: ['th', 'estado'],
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
