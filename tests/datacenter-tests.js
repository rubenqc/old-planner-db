'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const datacenterFixtures = require('./fixtures/datacenter')
const datacenterMainFixtures = require('./fixtures/datacenterMain')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let DatacenterMainStub = null
let DatacenterStub = null

// general
let DateStub = {
  hasMany: sinon.spy()
}
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

let datacenterMainId = 1
let condMainArgs = {
  where: {
    dc_principal: datacenterMainId
  }
}

let newDatacenterMainId = 5
let condNewDatacenterMain = {
  where: { dc_principal: newDatacenterMainId }
}

let datacenterId = datacenterFixtures.single.datacenter
let condDatacenterArgs = {
  where: {
    datacenter: datacenterId
  }
}

let newDatacenter = {
  id: 8,
  nombre: 'lalolalocura',
  dc_principalId: datacenterMainId
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  DatacenterStub = {
    hasMany: sandbox.spy(),
    belongsTo: sandbox.spy()
  }
  DatacenterMainStub = {
    hasMany: sandbox.spy()
  }

  // Class#Model findOne Stub
  DatacenterMainStub.findOne = sandbox.stub()
  DatacenterMainStub.findOne.withArgs(condMainArgs).returns(Promise.resolve(datacenterMainFixtures.single))
  DatacenterMainStub.findOne.withArgs(condNewDatacenterMain).returns(Promise.resolve(datacenterMainFixtures.findByDatacenterMain(newDatacenterMainId)))
  // Type#Model findOne Stub
  DatacenterStub.findOne = sandbox.stub()
  DatacenterStub.findOne.withArgs(condDatacenterArgs).returns(Promise.resolve(datacenterFixtures.single))
  // Type#Model update Stub
  DatacenterStub.update = sandbox.stub()
  DatacenterStub.update.withArgs(datacenterFixtures.single, condDatacenterArgs).returns(Promise.resolve(datacenterFixtures.single))
  // Type#Model create Stub
  DatacenterStub.create = sandbox.stub()
  DatacenterStub.create.withArgs(newDatacenter).returns(Promise.resolve({
    toJSON () {
      return newDatacenter
    }
  }))
  // Class#Model findAll Stub
  DatacenterStub.findAll = sandbox.stub()
  DatacenterStub.findAll.withArgs().returns(Promise.resolve(datacenterFixtures.findAll))

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

test('Datacenter', t => {
  t.truthy(db.Datacenter, 'Datacenter service should exist')
})

test('Setup', t => {
  t.true(DatacenterStub.hasMany.called, 'TypeModel.hasMany was execute')
  t.true(DatacenterStub.hasMany.calledOnce, 'hasMany should be called once')
  t.true(DatacenterStub.hasMany.calledWith(RegionStub), 'Argument needs should be the RegionModel args')
  t.true(DatacenterStub.belongsTo.called, 'TypeModel.belongsTo was executed')
  t.true(DatacenterStub.belongsTo.calledOnce, 'belongsTo should be called once')
  t.true(DatacenterStub.belongsTo.calledWith(DatacenterMainStub), 'TypeModel.belongsTo should be called with DatacenterMainModel args')
})

test.serial('Datacenter#createOrUpdate - exist', async t => {
  const datacenter = await db.Datacenter.createOrUpdate(datacenterFixtures.single, datacenterMainId)

  t.true(DatacenterMainStub.findOne.called, 'DatacenterMainModel.findOne was execute')
  t.true(DatacenterMainStub.findOne.calledOnce, 'DatacenterMain#findOne should be called once')
  t.true(DatacenterMainStub.findOne.calledWith(condMainArgs), 'findOne should be called with condArgs args')
  t.true(DatacenterStub.findOne.called, 'Datacenter.findOne was execute')
  t.true(DatacenterStub.findOne.calledTwice, 'Datacenter#findOne should be called once')
  t.true(DatacenterStub.findOne.calledWith(condDatacenterArgs), 'findOne should be called with tipo Args')
  t.true(DatacenterStub.update.called, 'update should be called')
  t.true(DatacenterStub.update.calledOnce, 'update should be called once')
  t.true(DatacenterStub.update.calledWith(datacenterFixtures.single, condDatacenterArgs), 'update should be called with single, cond Args')

  t.deepEqual(datacenter, datacenterFixtures.single, 'should be the same')
})

test.serial('Datacenter#createOrUpdate - new', async t => {
  const datacenter = await db.Datacenter.createOrUpdate(newDatacenter, datacenterMainId)

  t.true(DatacenterMainStub.findOne.called, 'DatacenterMainModel.findOne was execute')
  t.true(DatacenterMainStub.findOne.calledOnce, 'DatacenterMain#findOne should be called once')
  t.true(DatacenterMainStub.findOne.calledWith(condMainArgs), 'findOne should be called with condArgs args')
  t.true(DatacenterStub.findOne.called, 'Datacenter.findOne was execute')
  t.true(DatacenterStub.findOne.calledOnce, 'Datacenter#findOne should be called once')
  t.true(DatacenterStub.findOne.calledWith({ where: { datacenter: newDatacenter.datacenter } }), 'findOne should be called with newDatacenter Args')
  t.true(DatacenterStub.create.calledOnce, 'create should be called once')
  t.true(DatacenterStub.create.calledWith(newDatacenter), 'create should be called with newDatacenter args')

  t.deepEqual(datacenter, newDatacenter, 'should be the same')
})

test.serial('Datacenter#createOrUpdate - datacenterMain no exist', async t => {
  const datacenter = await db.Datacenter.createOrUpdate(newDatacenter, newDatacenterMainId)

  t.true(DatacenterMainStub.findOne.called, 'DatacenterMain.findOne was execute')
  t.true(DatacenterMainStub.findOne.calledOnce, ' findOne should be called once')
  t.true(DatacenterMainStub.findOne.calledWith(condNewDatacenterMain), 'findOne should be called with condNewDatacenterMain args')

  t.deepEqual(datacenter, datacenterMainFixtures.findByDatacenterMain(newDatacenterMainId), 'should be the same')
})

test.serial('Datacenter#findAll', async t => {
  let datacenters = await db.Datacenter.findAll()

  t.true(DatacenterStub.findAll.called, 'findAll should be called')
  t.true(DatacenterStub.findAll.calledOnce, 'findAll should be called once')
  t.true(DatacenterStub.findAll.calledWith(), 'findAll should be called without any args')

  t.deepEqual(datacenters, datacenterFixtures.findAll, 'Classes should be the same')
})
