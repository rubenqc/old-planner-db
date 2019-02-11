'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupGb (GbModel, DateModel, ClassModel, RegionModel) {
  async function createOrUpdate (gb, dateA, claseA, regionA) {
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

    Object.assign(gb, { fechaId: fecha.id, claseId: clase.id, regionId: region.id })
    const cond = {
      where: {
        fechaId: gb.fechaId,
        claseId: gb.claseId,
        regionId: gb.regionId,
        estado: gb.estado
      }
    }
    const existingGb = await GbModel.findOne(cond)

    if (existingGb) {
      const updated = await GbModel.update(gb, cond)
      return updated ? GbModel.findOne(cond) : existingGb
    }

    const result = await GbModel.create(gb)
    return result.toJSON()
  }

  function findAll () {
    return GbModel.findAll({
      attributes: ['id', 'gb', 'estado'],
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

  async function findByRange (startDate, finalDate, clase, estado) {
    return GbModel.findAll({
      attributes: ['gb', 'estado'],
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
          model: RegionModel
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
