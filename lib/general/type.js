'use strict'

module.exports = function setupType (TypeModel, ClassModel) {
  async function createOrUpdate (type, claseId) {
    const clase = await ClassModel.findOne({
      where: { clase: claseId }
    })

    if (clase) {
      Object.assign(type, { claseId: clase.clase })
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
    return clase
  }

  function findAll () {
    return TypeModel.findAll()
  }

  return {
    createOrUpdate,
    findAll
  }
}
