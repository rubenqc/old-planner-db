'use strict'

module.exports = function setupDatacenterMain (DatacenterMainModel) {
  async function createOrUpdate (datacenterMain) {
    const cond = {
      where: {
        dc_principal: datacenterMain.dc_principal
      }
    }

    const existingDatacenterMain = await DatacenterMainModel.findOne(cond)

    if (existingDatacenterMain) {
      const updated = await DatacenterMainModel.update(datacenterMain, cond)
      return updated ? DatacenterMainModel.findOne(cond) : existingDatacenterMain
    }

    const result = await DatacenterMainModel.create(datacenterMain)
    return result.toJSON()
  }

  function findAll () {
    return DatacenterMainModel.findAll()
  }

  return {
    createOrUpdate,
    findAll
  }
}
