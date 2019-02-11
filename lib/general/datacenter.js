'use strict'

module.exports = function setupDatacenter (DatacenterModel, DatacenterMainModel) {
  async function createOrUpdate (datacenter, datacenterMain) {
    const datacenterMainExist = await DatacenterMainModel.findOne({
      where: { dc_principal: datacenterMain }
    })

    if (datacenterMainExist) {
      Object.assign(datacenter, { dcPrincipaleId: datacenterMainExist.id })
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
    return datacenterMainExist
  }

  function findAll () {
    return DatacenterModel.findAll({
      attributes: ['datacenter', 'nombre', 'tipo', 'dcPrincipaleId'],
      group: ['datacenter'],
      include: [
        {
          attributes: ['dc_principal'],
          model: DatacenterMainModel
        }
      ],
      raw: true
    })
  }

  function findByDatacenterMain (datacenterMain) {
    return DatacenterModel.findAll({
      attributes: ['datacenter', 'nombre', 'tipo'],
      group: ['datacenter'],
      include: [{
        attributes: [],
        model: DatacenterMainModel,
        where: {
          dc_principal: datacenterMain
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
