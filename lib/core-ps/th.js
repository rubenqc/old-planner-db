'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupTh (ThModel, DateModel, ClassModel, RegionModel) {
  async function createOrUpdate (th, dateA, claseA, regionA) {
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

    Object.assign(th, { fechaId: fecha.id, claseId: clase.id, regionId: region.id })
    const cond = {
      where: {
        fechaId: th.fechaId,
        claseId: th.claseId,
        regionId: th.regionId,
        estado: th.estado
      }
    }
    const existingTh = await ThModel.findOne(cond)

    if (existingTh) {
      const updated = await ThModel.update(th, cond)
      return updated ? ThModel.findOne(cond) : existingTh
    }

    const result = await ThModel.create(th)
    return result.toJSON()
  }

  function findAll () {
    return ThModel.findAll({
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
    return ThModel.findAll({
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
