'use strict'

const single = {
  region: 1,
  nombre: 'region1',
  tipo: 1,
  datacenterId: 1
}

const regions = [
  single,
  extend(single, { region: 2, nombre: 'region2' }),
  extend(single, { region: 3, nombre: 'region3' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single,
  findAll: regions,
  findByDatacenterId: datacenterId => regions.filter(a => a.datacenterId === datacenterId)
}
