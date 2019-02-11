'use strict'

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = function setupUsers (UsersModel, DateModel, TypeModel) {
  async function createOrUpdate (users, dateA, type) {
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

    Object.assign(users, { fechaId: fecha.id, tipoId: tipo.id })
    const cond = {
      where: {
        fechaId: users.fechaId,
        tipoId: users.tipoId,
        estado: users.estado
      }
    }
    const existingUsers = await UsersModel.findOne(cond)

    if (existingUsers) {
      const updated = await UsersModel.update(users, cond)
      return updated ? UsersModel.findOne(cond) : existingUsers
    }

    const result = await UsersModel.create(users)
    return result.toJSON()
  }

  function findAll () {
    return UsersModel.findAll({
      attributes: ['id', 'usuarios', 'estado'],
      group: ['id'],
      include: [
        {
          attributes: ['fecha'],
          model: DateModel
        },
        {
          attributes: ['tipo'],
          model: TypeModel
        }
      ],
      raw: true
    })
  }

  async function findByRange (startDate, finalDate, tipo, estado) {
    return UsersModel.findAll({
      attributes: ['usuarios', 'estado'],
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
