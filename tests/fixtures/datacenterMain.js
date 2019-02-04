'use strict'

const single = {
  dc_principal: 1,
  nombre: 'lima'
}

const datacentersMain = [
  single,
  extend(single, { dc_principal: 2, nombre: 'trujillo' }),
  extend(single, { dc_principal: 3, nombre: 'prueba' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(values, clone)
}

module.exports = {
  single,
  findAll: datacentersMain
}
