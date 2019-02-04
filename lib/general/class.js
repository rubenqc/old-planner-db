'use strict'

module.exports = function setupClass (ClassModel) {
  async function createOrUpdate (classClase) {
    const cond = {
      where: {
        clase: classClase.clase
      }
    }

    const existingClass = await ClassModel.findOne(cond)

    if (existingClass) {
      const updated = await ClassModel.update(classClase, cond)
      return updated ? ClassModel.findOne(cond) : existingClass
    }

    const result = await ClassModel.create(classClase)
    return result.toJSON()
  }

  function findAll () {
    return ClassModel.findAll()
  }

  return {
    createOrUpdate,
    findAll
  }
}
