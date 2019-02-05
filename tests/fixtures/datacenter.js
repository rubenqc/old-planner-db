'use strict'

const single = {
  datacenter: 1,
  nombre: 'sjl',
  tipo: 1,
  dc_principalId: 1
}

const datacenters = [
  single,
  extend(single, { datacenter: 2, nombre: 'moquehua' }),
  extend(single, { datacenter: 3, nombre: 'san martin' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single,
  findAll: datacenters,
  findByDatacenterMainId: datacenterMainId => datacenters.filter(a => a.dc_principalId === datacenterMainId),
  findByDatacenterId: datacenterId => datacenters.filter(a => a.datacenter === datacenterId) 
}
