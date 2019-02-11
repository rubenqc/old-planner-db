'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupPdpSau (PdpSauModel, DateModel, ClassModel) {
  async function createOrUpdate (pdpsau, dateA, claseA) {
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

    Object.assign(pdpsau, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: pdpsau.fechaId,
        claseId: pdpsau.claseId,
        estado: pdpsau.estado
      }
    }
    const existingPdpSau = await PdpSauModel.findOne(cond)

    if (existingPdpSau) {
      const updated = await PdpSauModel.update(pdpsau, cond)
      return updated ? PdpSauModel.findOne(cond) : existingPdpSau
    }

    const result = await PdpSauModel.create(pdpsau)
    return result.toJSON()
  }

  function findAll () {
    return PdpSauModel.findAll({
      attributes: ['id', 'pdp_sau', 'estado'],
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
    return PdpSauModel.findAll({
      attributes: ['pdp_sau', 'estado'],
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
