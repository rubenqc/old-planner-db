'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupSau (SauModel, DateModel, ClassModel, RegionModel) {
  async function createOrUpdate (sau, dateA, claseA, regionA) {
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

    Object.assign(sau, { fechaId: fecha.id, claseId: clase.id, regionId: region.id })
    const cond = {
      where: {
        fechaId: sau.fechaId,
        claseId: sau.claseId,
        regionId: sau.regionId,
        estado: sau.estado
      }
    }
    const existingSau = await SauModel.findOne(cond)

    if (existingSau) {
      const updated = await SauModel.update(sau, cond)
      return updated ? SauModel.findOne(cond) : existingSau
    }

    const result = await SauModel.create(sau)
    return result.toJSON()
  }

  function findAll () {
    return SauModel.findAll({
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
    return SauModel.findAll({
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
