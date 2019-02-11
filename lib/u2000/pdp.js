'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupUpdp (UpdpModel, DateModel, ClassModel) {
  async function createOrUpdate (updp, dateA, claseA) {
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

    Object.assign(updp, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: updp.fechaId,
        claseId: updp.claseId,
        estado: updp.estado
      }
    }
    const existingUpdp = await UpdpModel.findOne(cond)

    if (existingUpdp) {
      const updated = await UpdpModel.update(updp, cond)
      return updated ? UpdpModel.findOne(cond) : existingUpdp
    }

    const result = await UpdpModel.create(updp)
    return result.toJSON()
  }

  function findAll () {
    return UpdpModel.findAll({
      attributes: ['id', 'pdp', 'estado'],
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
    return UpdpModel.findAll({
      attributes: ['pdp', 'estado'],
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
