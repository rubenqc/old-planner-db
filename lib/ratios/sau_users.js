'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupSauUsers (SauUsersModel, DateModel, ClassModel) {
  async function createOrUpdate (sauusers, dateA, claseA) {
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

    Object.assign(sauusers, { fechaId: fecha.id, claseId: clase.id })
    const cond = {
      where: {
        fechaId: sauusers.fechaId,
        claseId: sauusers.claseId,
        estado: sauusers.estado
      }
    }
    const existingSauUsers = await SauUsersModel.findOne(cond)

    if (existingSauUsers) {
      const updated = await SauUsersModel.update(sauusers, cond)
      return updated ? SauUsersModel.findOne(cond) : existingSauUsers
    }

    const result = await SauUsersModel.create(sauusers)
    return result.toJSON()
  }

  function findAll () {
    return SauUsersModel.findAll({
      attributes: ['id', 'sau_usuarios', 'estado'],
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
    return SauUsersModel.findAll({
      attributes: ['sau_usuarios', 'estado'],
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
