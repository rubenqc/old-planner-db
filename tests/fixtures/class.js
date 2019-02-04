'use strict'

const single = {
  clase: 1,
  nombre: 'bafi'
}

const classes = [
  single,
  extend(single, { class: 2, nombre: 'móvil' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(values, clone)
}

module.exports = {
  single,
  findAll: classes
}
