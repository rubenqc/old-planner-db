'use strict'

module.exports = function setupRegion (RegionModel, DatacenterModel) {
  async function createOrUpdate (region, datacenter) {
    const datacenterExist = await DatacenterModel.findOne({
      where: { datacenter }
    })

    if (region) {
      Object.assign(region, { datacenterId: datacenterExist.id })
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
    return datacenterExist
  }

  function findAll () {
    return RegionModel.findAll({
      attributes: ['region', 'nombre'],
      group: ['region'],
      include: [
        {
          attributes: ['datacenter'],
          model: DatacenterModel
        }
      ],
      raw: true
    })
  }

  function findByDatacenter (datacenter) {
    return RegionModel.findAll({
      attributes: ['region', 'nombre'],
      group: ['region'],
      include: [{
        attributes: [],
        model: DatacenterModel,
        where: {
          datacenter
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
