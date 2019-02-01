'use strict'

const date = {
  id: 1,
  fecha: '2018-05-01',
  createAt: Date(),
  updateAt: Date()
}

const dates = [
  date,
  extend(date, { id: 2, fecha: '2018-06-01' }),
  extend(date, { id: 3, fecha: '2018-07-01' }),
  extend(date, { id: 4, fecha: '2018-08-01' }),
  extend(date, { id: 5, fecha: '2018-09-01' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: date,
  all: dates,
  findByDate: fecha => dates.filter(a => a.fecha === fecha).shift(),
  findByRange: (startDate, finalDate) => dates.filter
}
