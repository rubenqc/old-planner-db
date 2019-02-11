'use strict'

module.exports = function setupType (TypeModel, ClassModel) {
  async function createOrUpdate (type, clase) {
    const claseExist = await ClassModel.findOne({
      where: { clase }
    })

    if (claseExist) {
      Object.assign(type, { claseId: claseExist.id })
      const cond = {
        where: {
          tipo: type.tipo
        }
      }
      const existingType = await TypeModel.findOne(cond)

      if (existingType) {
        const updated = await TypeModel.update(type, cond)
        return updated ? TypeModel.findOne(cond) : existingType
      }

      const result = await TypeModel.create(type)
      return result.toJSON()
    }
    return claseExist
  }

  function findAll () {
    return TypeModel.findAll({
      attributes: ['tipo', 'nombre'],
      group: ['tipo'],
      include: [
        {
          attributes: ['clase'],
          model: ClassModel
        }
      ],
      raw: true
    })
  }

  function findByClass (clase) {
    return TypeModel.findAll({
      attributes: ['tipo', 'nombre'],
      group: ['tipo'],
      include: [{
        attributes: [],
        model: ClassModel,
        where: {
          clase
        }
      }],
      raw: true
    })
  }

  return {
    createOrUpdate,
    findAll,
    findByClass
  }
}
