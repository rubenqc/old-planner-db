'use strict'

module.exports = function setupDatacenter (DatacenterModel, DatacenterMainModel) {
  async function createOrUpdate (datacenter, datacenterMainId) {
    const datacenterMain = await DatacenterMainModel.findOne({
      where: { dc_principal: datacenterMainId }
    })

    if (datacenterMain) {
      Object.assign(datacenter, { dc_principalId: datacenterMainId })
      const cond = {
        where: {
          datacenter: datacenter.datacenter
        }
      }
      const existingDatacenter = await DatacenterModel.findOne(cond)

      if (existingDatacenter) {
        const updated = await DatacenterModel.update(datacenter, cond)
        return updated ? DatacenterModel.findOne(cond) : existingDatacenter
      }

      const result = await DatacenterModel.create(datacenter)
      return result.toJSON()
    }
    return datacenterMain
  }

  function findAll () {
    return DatacenterModel.findAll()
  }

  function findByDatacenterMain (datacenterMainId) {
    return DatacenterModel.findAll({
      attributes: ['datacenter', 'nombre'],
      group: ['datacenter'],
      include: [{
        attributes: [],
        model: DatacenterMainModel,
        where: {
          dc_principal: datacenterMainId
        }
      }],
      raw: true
    })
  }

  return {
    createOrUpdate,
    findAll,
    findByDatacenterMain
  }
}
