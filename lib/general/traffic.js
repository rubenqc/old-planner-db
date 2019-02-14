'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupTraffic (TrafficModel, DateModel, TypeModel, RegionModel) {
  async function createOrUpdate (traffic, dateA, type, regionA) {
    const fecha = await DateModel.findOne({
      where: { fecha: dateA }
    })

    if (!fecha) {
      return 1
    }

    const tipo = await TypeModel.findOne({
      where: { tipo: type }
    })

    if (!tipo) {
      return 2
    }

    const region = await RegionModel.findOne({
      where: { region: regionA }
    })

    if (!region) {
      return 3
    }

    Object.assign(traffic, { fechaId: fecha.id, tipoId: tipo.id, regionId: region.id })
    const cond = {
      where: {
        fechaId: traffic.fechaId,
        tipoId: traffic.tipoId,
        regionId: traffic.regionId,
        estado: traffic.estado
      }
    }
    const existingTraffic = await TrafficModel.findOne(cond)

    if (existingTraffic) {
      const updated = await TrafficModel.update(traffic, cond)
      return updated ? TrafficModel.findOne(cond) : existingTraffic
    }

    const result = await TrafficModel.create(traffic)
    return result.toJSON()
  }

  function findAll () {
    return TrafficModel.findAll({
      attributes: ['id', 'trafico', 'estado'],
      group: ['id'],
      include: [
        {
          attributes: ['fecha'],
          model: DateModel
        },
        {
          attributes: ['tipo'],
          model: TypeModel
        },
        {
          attributes: ['region'],
          model: RegionModel
        }
      ],
      raw: true
    })
  }

  async function findByRange (startDate, finalDate, tipo, region, estado) {
    return TrafficModel.findAll({
      attributes: ['trafico', 'estado'],
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
          attributes: ['tipo'],
          model: TypeModel,
          where: {
            tipo
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
