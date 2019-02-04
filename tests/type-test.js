'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

// const typeFixtures = require('./fixtures/type')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let TypeStub = null

// general
let DateStub = {
  hasMany: sinon.spy()
}
let ClassStub = {
  hasMany: sinon.spy()
}
let RegionStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}
let DatacenterStub = {
  belongsTo: sinon.spy(),
  hasMany: sinon.spy()
}
let DatacenterMainStub = {
  hasMany: sinon.spy()
}

let UsersStub = {
  belongsTo: sinon.spy()
}
let TrafficStub = {
  belongsTo: sinon.spy()
}
let GbStub = {
  belongsTo: sinon.spy()
}
let CentralizedAnalysisStub = {
  belongsTo: sinon.spy()
}

// core-ps
let PdpStub = {
  belongsTo: sinon.spy()
}
let SauStub = {
  belongsTo: sinon.spy()
}
let ThStub = {
  belongsTo: sinon.spy()
}

// u2000
let UthStub = {
  belongsTo: sinon.spy()
}
let UpdpStub = {
  belongsTo: sinon.spy()
}
let UsauStub = {
  belongsTo: sinon.spy()
}

// ratios
let PdpSauStub = {
  belongsTo: sinon.spy()
}
let SauUsersStub = {
  belongsTo: sinon.spy()
}
let ThfcSauStub = {
  belongsTo: sinon.spy()
}
let ThfcPdpStub = {
  belongsTo: sinon.spy()
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  TypeStub = {
    hasMany: sandbox.spy(),
    belongsTo: sandbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/general/users': () => UsersStub,
    './models/general/traffic': () => TrafficStub,
    './models/general/gb': () => GbStub,
    './models/general/centralized_analysis': () => CentralizedAnalysisStub,

    './models/general/date': () => DateStub,
    './models/general/type': () => TypeStub,
    './models/general/class': () => ClassStub,
    './models/general/region': () => RegionStub,
    './models/general/datacenter': () => DatacenterStub,
    './models/general/datacenter_main': () => DatacenterMainStub,

    './models/core-ps/pdp': () => PdpStub,
    './models/core-ps/sau': () => SauStub,
    './models/core-ps/th': () => ThStub,

    './models/u2000/th': () => UthStub,
    './models/u2000/pdp': () => UpdpStub,
    './models/u2000/sau': () => UsauStub,

    './models/ratios/pdp_ sau': () => PdpSauStub,
    './models/ratios/sau_users': () => SauUsersStub,
    './models/ratios/thfc_sau': () => ThfcSauStub,
    './models/ratios/thfc_pdp': () => ThfcPdpStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Type', t => {
  t.truthy(db.Type, 'Type service should exist')
})

test('Setup', t => {
  t.true(TypeStub.hasMany.called, 'TypeModel.hasMany was execute')
  t.true(TypeStub.hasMany.calledTwice, 'hasMany should be called twice')
  t.true(TypeStub.hasMany.calledWith(UsersStub), 'Argument needs should be the UsersModel')
  t.true(TypeStub.hasMany.calledWith(TrafficStub), 'Argument needs should be the TrafficModel')
  t.true(TypeStub.belongsTo.called, 'TypeModel.belongsTo was executed')
  t.true(TypeStub.belongsTo.calledOnce, 'belongsTo should be called once')
  t.true(TypeStub.belongsTo.calledWith(ClassStub), 'TypeModel.belongsTo should be called with ClassStub args')
})

// test.serial('Type#createOrUpdate',async  t => {
//   const type = await db.Type.createOrUpdate()

//   t.deepEqual(type, single, 'should be the same')
// })
