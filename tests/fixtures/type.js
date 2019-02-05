'use strict'

const single = {
  id: 1,
  tipo: 5,
  nombre: 'aws',
  createdAt: Date(),
  updateAt: Date(),
  claseId: 1
}

const types = [
  single,
  extend(single, { id: 2, tipo: 6, nombre: 'prueba6', claseId: 1 }),
  extend(single, { id: 3, tipo: 7, nombre: 'prueba7', claseId: 2 }),
  extend(single, { id: 4, tipo: 8, nombre: 'prueba8', claseId: 2 })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single,
  types
}
