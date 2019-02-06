'use strict'

module.exports = function setupUsers (UsersModel, DateModel) {
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
}
