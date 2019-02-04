'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const datacenterMainFixtures = require('./fixtures/datacenterMain')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let DatacenterMainStub = null

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
let TypeStub = {
  hasMany: sinon.spy(),
  belongsTo: sinon.spy()
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

let condArgs = {
  where: {
    dc_principal: datacenterMainFixtures.single.dc_principal
  }
}

let newDatacenterMain = {
  dc_principal: 4,
  nombre: 'villa el salvador'
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  DatacenterMainStub = {
    hasMany: sandbox.spy()
  }

  // DatacenterMain#Model findOne Stub
  DatacenterMainStub.findOne = sandbox.stub()
  DatacenterMainStub.findOne.withArgs(condArgs).returns(Promise.resolve(datacenterMainFixtures.single))

  // DatacenterMain#Model update Stub
  DatacenterMainStub.update = sandbox.stub()
  DatacenterMainStub.update.withArgs(datacenterMainFixtures.single, condArgs).returns(Promise.resolve(datacenterMainFixtures.single))

  // DatacenterMain#Model create Stub
  DatacenterMainStub.create = sandbox.stub()
  DatacenterMainStub.create.withArgs(newDatacenterMain).returns(Promise.resolve({
    toJSON () {
      return newDatacenterMain
    }
  }))

   // DatacenterMain#Model findAll Stub
   DatacenterMainStub.findAll = sandbox.stub()
   DatacenterMainStub.findAll.withArgs().returns(Promise.resolve(datacenterMainFixtures.findAll))

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

test('DatacenterMain', t => {
  t.truthy(db.DatacenterMain, 'Type service should exist')
})

test.serial('Setup', t => {
  t.true(DatacenterMainStub.hasMany.called, 'DatacenterMainModel.hasMany was execute')
  t.true(DatacenterMainStub.hasMany.calledOnce, 'hasMany should be called once')
  t.true(DatacenterMainStub.hasMany.calledWith(DatacenterStub), 'hasMany should be called with DatacenterModel args')
})

test.serial('DatacenterMain#createOrUpdate - exist', async t => {
  let datacenterMain = await db.DatacenterMain.createOrUpdate(datacenterMainFixtures.single)

  t.true(DatacenterMainStub.findOne.called, 'findOne should be called on model')
  t.true(DatacenterMainStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(DatacenterMainStub.update.called, 'update should be called on modal')
  t.true(DatacenterMainStub.update.calledOnce, 'update should be called once')

  t.deepEqual(datacenterMain, datacenterMainFixtures.single, 'should be the same')
})

test.serial('DatacenterMain#createOrUpdate - new', async t => {
  let datacenterMain = await db.DatacenterMain.createOrUpdate(newDatacenterMain)

  t.true(DatacenterMainStub.findOne.called, 'findOne should be called on model')
  t.true(DatacenterMainStub.findOne.calledOnce, 'findOne should be called once')
  t.true(DatacenterMainStub.findOne.calledWith({
    where: {
      dc_principal: newDatacenterMain.dc_principal
    }
  }), 'findOne should be called with cond args')
  t.true(DatacenterMainStub.create.called, 'create should be called on model')
  t.true(DatacenterMainStub.create.calledOnce, 'create should be called once')
  t.true(DatacenterMainStub.create.calledWith(newDatacenterMain), 'create should be called with newDatacenterMain args')

  t.deepEqual(datacenterMain, newDatacenterMain, 'should be the same')
})

test.serial('DatacenterMain#findAll', async t => {
    let datacentersMain = await db.DatacenterMain.findAll()
  
    t.true(DatacenterMainStub.findAll.called, 'findAll should be called on model')
    t.true(DatacenterMainStub.findAll.calledOnce, 'findAll should be called once')
    t.true(DatacenterMainStub.findAll.calledWith(), 'findAll should be called without args')
  
    t.deepEqual(datacentersMain, datacenterMainFixtures.findAll, 'datacentersMain should be the same')
  })
