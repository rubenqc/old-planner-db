'use strict'

module.exports = function setupType (TypeModel) {
  async function createOrUpdate (type) {
    const cond = {
      where: {
        tipo: type.tipo
      }
    }

    const existingType = await TypeModel.findOne(cond)

    if (existingType) {
      const updated = await TypeModel.update(type, cond)
      return updated ? TypeModel.findOne() : existingType
    }

    const result = await TypeModel.create(type)
    return result.toJSON()
  }

  function findAll () {
    return TypeModel.findAll()
  }

  return {
    createOrUpdate,
    findAll
  }
}
