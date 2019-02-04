'use strict'

const single = {
  clase: 1,
  nombre: 'bafi'
}

const classes = [
  single,
  extend(single, { clase: 2, nombre: 'móvil' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single,
  findAll: classes,
  findByClass: id => classes.filter(a => a.clase === id).shift()
}
