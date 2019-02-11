'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupPdp (PdpModel, DateModel, ClassModel, RegionModel) {
  async function createOrUpdate (pdp, dateA, claseA, regionA) {
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

    const region = await RegionModel.findOne({
      where: { region: regionA }
    })

    if (!region) {
      return 3
    }

    Object.assign(pdp, { fechaId: fecha.id, claseId: clase.id, regionId: region.id })
    const cond = {
      where: {
        fechaId: pdp.fechaId,
        claseId: pdp.claseId,
        regionId: pdp.regionId,
        estado: pdp.estado
      }
    }
    const existingPdp = await PdpModel.findOne(cond)

    if (existingPdp) {
      const updated = await PdpModel.update(pdp, cond)
      return updated ? PdpModel.findOne(cond) : existingPdp
    }

    const result = await PdpModel.create(pdp)
    return result.toJSON()
  }

  function findAll () {
    return PdpModel.findAll({
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
        },
        {
          attributes: ['region'],
          model: RegionModel
        }
      ],
      raw: true
    })
  }

  async function findByRange (startDate, finalDate, clase, region, estado) {
    return PdpModel.findAll({
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
        },
        {
          attributes: ['region'],
          model: RegionModel,
          where: {
            region
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
