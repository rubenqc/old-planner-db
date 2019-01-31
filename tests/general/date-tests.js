'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let DateStub = null

// general
let TypeStub = {
  belongsTo: sinon.spy(),
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
  DateStub = {
    hasMany: sandbox.spy(),
    beforeEach: sandbox.spy()
  }
  const setupDatabase = proxyquire('../../', {
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

test('Date', t => {
  t.truthy(db.DateFecha, 'Date service should exists.')
})

test.serial('Setup', t => {
    t.true(DateStub.hasMany.called, 'DateModel.hasMany was execute')
    t.true(DateStub.hasMany.callCount === 14 , 'hasMany should be called 14 times')
    t.true(DateStub.hasMany.calledWith(UsersStub), 'Argument needs should be the UsersModel')
    t.true(DateStub.hasMany.calledWith(TrafficStub), 'Argument needs should be the TrafficModel')
    t.true(DateStub.hasMany.calledWith(GbStub), 'Argument needs should be the GbModel')
    t.true(DateStub.hasMany.calledWith(CentralizedAnalysisStub), 'Argument needs should be the CentralizedAnlysis')
    t.true(DateStub.hasMany.calledWith(ThStub), 'Argument needs should be the ThModel')
    t.true(DateStub.hasMany.calledWith(PdpStub), 'Argument needs should be the PdpModel')
    t.true(DateStub.hasMany.calledWith(SauStub), 'Argument needs should be the SauModel')
    t.true(DateStub.hasMany.calledWith(UthStub), 'Argument needs should be the UthModel')
    t.true(DateStub.hasMany.calledWith(UpdpStub), 'Argument needs should be the UpdpModel')
    t.true(DateStub.hasMany.calledWith(UsauStub), 'Argument needs should be the UsauModel')
    t.true(DateStub.hasMany.calledWith(SauUsersStub), 'Argument needs should be the SauUsersModel')
    t.true(DateStub.hasMany.calledWith(PdpSauStub), 'Argument needs should be the PspSauModel')
    t.true(DateStub.hasMany.calledWith(ThfcPdpStub), 'Argument needs should be the ThfcPdpModel')
    t.true(DateStub.hasMany.calledWith(ThfcSauStub), 'Argument needs should be the ThfcSauModel')
})
