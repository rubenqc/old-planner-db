'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupThfcPdp (ThfcPdpModel, DateModel, ClassModel) {
  async function createOrUpdate (thfcpdp, dateA, claseA) {
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

    Object.assign(thfcpdp, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: thfcpdp.fechaId,
        claseId: thfcpdp.claseId,
        estado: thfcpdp.estado
      }
    }
    const existingThfcPdp = await ThfcPdpModel.findOne(cond)

    if (existingThfcPdp) {
      const updated = await ThfcPdpModel.update(thfcpdp, cond)
      return updated ? ThfcPdpModel.findOne(cond) : existingThfcPdp
    }

    const result = await ThfcPdpModel.create(thfcpdp)
    return result.toJSON()
  }

  function findAll () {
    return ThfcPdpModel.findAll({
      attributes: ['id', 'thfc_pdp', 'estado'],
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
    return ThfcPdpModel.findAll({
      attributes: ['thfc_pdp', 'estado'],
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
