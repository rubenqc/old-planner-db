'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupCentralizedAnalysis (CentralizedAnalysisModel, DateModel, ClassModel) {
  async function createOrUpdate (centralizedAnalysis, dateA, claseA) {
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

    Object.assign(centralizedAnalysis, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: centralizedAnalysis.fechaId,
        claseId: centralizedAnalysis.claseId,
        estado: centralizedAnalysis.estado
      }
    }
    const existingCentralizedAnalysis = await CentralizedAnalysisModel.findOne(cond)

    if (existingCentralizedAnalysis) {
      const updated = await CentralizedAnalysisModel.update(centralizedAnalysis, cond)
      return updated ? CentralizedAnalysisModel.findOne(cond) : existingCentralizedAnalysis
    }

    const result = await CentralizedAnalysisModel.create(centralizedAnalysis)
    return result.toJSON()
  }

  function findAll () {
    return CentralizedAnalysisModel.findAll({
      attributes: ['id', 'th', 'sau', 'pdp', 'estado'],
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
    return CentralizedAnalysisModel.findAll({
      attributes: ['th', 'sau', 'pdp', 'estado'],
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
