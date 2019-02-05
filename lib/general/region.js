'use strict'

module.exports = function setupRegion (RegionModel, DatacenterModel) {
  async function createOrUpdate (region, datacenterId) {
    const datacenter = await DatacenterModel.findOne({
      where: { datacenter: datacenterId }
    })

    if (datacenter) {
      Object.assign(datacenter, { datacenterId })
      const cond = {
        where: {
          region: region.region
        }
      }
      const existingRegion = await RegionModel.findOne(cond)

      if (existingRegion) {
        const updated = await RegionModel.update(region, cond)
        return updated ? RegionModel.findOne(cond) : existingRegion
      }

      const result = await RegionModel.create(region)
      return result.toJSON()
    }
    return datacenter
  }

  function findAll () {
    return RegionModel.findAll()
  }

  function findByDatacenter (datacenterId) {
    return RegionModel.findAll({
      attributes: ['region', 'nombre'],
      group: ['region'],
      include: [{
        attributes: [],
        model: DatacenterModel,
        where: {
          datacenter: datacenterId
        }
      }],
      raw: true
    })
  }

  return {
    createOrUpdate,
    findAll,
    findByDatacenter
  }
}
