'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupThfcSau (ThfcSauModel, DateModel, ClassModel) {
  async function createOrUpdate (thfcsau, dateA, claseA) {
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

    Object.assign(thfcsau, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: thfcsau.fechaId,
        claseId: thfcsau.claseId,
        estado: thfcsau.estado
      }
    }
    const existingThfcSau = await ThfcSauModel.findOne(cond)

    if (existingThfcSau) {
      const updated = await ThfcSauModel.update(thfcsau, cond)
      return updated ? ThfcSauModel.findOne(cond) : existingThfcSau
    }

    const result = await ThfcSauModel.create(thfcsau)
    return result.toJSON()
  }

  function findAll () {
    return ThfcSauModel.findAll({
      attributes: ['id', 'thfc_sau', 'estado'],
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
    return ThfcSauModel.findAll({
      attributes: ['thfc_sau', 'estado'],
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
