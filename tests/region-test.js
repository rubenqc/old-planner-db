'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const datacenterFixtures = require('./fixtures/datacenter')
const regionFixtures = require('./fixtures/region')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let DatacenterStub = null
let RegionStub = null

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

let datacenterId = 1
let condDatacenterArgs = {
  where: {
    datacenter: datacenterId
  }
}

let newDatacenterId = 15
let condNewDatacenter = {
  where: { datacenter: newDatacenterId }
}

let regionId = regionFixtures.single.region
let condRegionArgs = {
  where: {
    region: regionId
  }
}

let newRegion = {
  id: 8,
  nombre: 'lalolalocura',
  datacenterId
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  RegionStub = {
    hasMany: sandbox.spy(),
    belongsTo: sandbox.spy()
  }
  DatacenterStub = {
    hasMany: sandbox.spy(),
    belongsTo: sandbox.spy()
  }

  // Class#Model findOne Stub
  DatacenterStub.findOne = sandbox.stub()
  DatacenterStub.findOne.withArgs(condDatacenterArgs).returns(Promise.resolve(datacenterFixtures.single))
  // Type#Model findOne Stub
  RegionStub.findOne = sandbox.stub()
  RegionStub.findOne.withArgs(condRegionArgs).returns(Promise.resolve(regionFixtures.single))
  // Type#Model update Stub
  RegionStub.update = sandbox.stub()
  RegionStub.update.withArgs(regionFixtures.single, condRegionArgs).returns(Promise.resolve(regionFixtures.single))
  // Type#Model create Stub
  RegionStub.create = sandbox.stub()
  RegionStub.create.withArgs(newRegion).returns(Promise.resolve({
    toJSON () {
      return newRegion
    }
  }))
  // Class#Model findAll Stub
  RegionStub.findAll = sandbox.stub()
  RegionStub.findAll.withArgs().returns(Promise.resolve(regionFixtures.findAll))
  RegionStub.findAll.withArgs({
    attributes: ['region', 'nombre'],
    group: ['region'],
    include: [{
      attributes: [],
      model: DatacenterStub,
      where: {
        datacenter: datacenterId
      }
    }],
    raw: true
  }).returns(Promise.resolve(regionFixtures.findByDatacenterId(datacenterId)))

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

test('Region', t => {
  t.truthy(db.Region, 'Region service should exist')
})

test('Setup', t => {
  t.true(RegionStub.hasMany.called, 'DatacenterModel.hasMany was execute')
  t.true(RegionStub.hasMany.callCount === 6, 'hasMany should be called once')
  t.true(RegionStub.hasMany.calledWith(UsersStub), 'Argument needs should be the UsersModel args')
  t.true(RegionStub.hasMany.calledWith(TrafficStub), 'Argument needs should be the TrafficModel args')
  t.true(RegionStub.hasMany.calledWith(GbStub), 'Argument needs should be the GbModel args')
  t.true(RegionStub.hasMany.calledWith(ThStub), 'Argument needs should be the ThModel args')
  t.true(RegionStub.hasMany.calledWith(SauStub), 'Argument needs should be the SauModel args')
  t.true(RegionStub.hasMany.calledWith(PdpStub), 'Argument needs should be the PdpModel args')
  t.true(RegionStub.belongsTo.called, 'DatacenterModel.belongsTo was executed')
  t.true(RegionStub.belongsTo.calledOnce, 'belongsTo should be called once')
  t.true(RegionStub.belongsTo.calledWith(DatacenterStub), 'RegionModel.belongsTo should be called with DatacenterMainModel args')
})

test.serial('Region#createOrUpdate - exist', async t => {
  const region = await db.Region.createOrUpdate(regionFixtures.single, datacenterId)

  t.true(DatacenterStub.findOne.called, 'DatacenterMainModel.findOne was execute')
  t.true(DatacenterStub.findOne.calledOnce, 'DatacenterMain#findOne should be called once')
  t.true(DatacenterStub.findOne.calledWith(condDatacenterArgs), 'findOne should be called with condArgs args')
  t.true(RegionStub.findOne.called, 'Region.findOne was execute')
  t.true(RegionStub.findOne.calledTwice, 'Region#findOne should be called once')
  t.true(RegionStub.findOne.calledWith(condRegionArgs), 'findOne should be called with tipo Args')
  t.true(RegionStub.update.called, 'update should be called')
  t.true(RegionStub.update.calledOnce, 'update should be called once')
  t.true(RegionStub.update.calledWith(regionFixtures.single, condRegionArgs), 'update should be called with single, cond Args')

  t.deepEqual(region, regionFixtures.single, 'should be the same')
})

test.serial('Region#createOrUpdate - new', async t => {
  const region = await db.Region.createOrUpdate(newRegion, datacenterId)

  t.true(DatacenterStub.findOne.called, 'DatacenterMainModel.findOne was execute')
  t.true(DatacenterStub.findOne.calledOnce, 'DatacenterMain#findOne should be called once')
  t.true(DatacenterStub.findOne.calledWith(condDatacenterArgs), 'findOne should be called with condArgs args')
  t.true(RegionStub.findOne.called, 'Region.findOne was execute')
  t.true(RegionStub.findOne.calledOnce, 'Region#findOne should be called once')
  t.true(RegionStub.findOne.calledWith({ where: { region: newRegion.region } }), 'findOne should be called with newDatacenter Args')
  t.true(RegionStub.create.calledOnce, 'create should be called once')
  t.true(RegionStub.create.calledWith(newRegion), 'create should be called with newDatacenter args')

  t.deepEqual(region, newRegion, 'should be the same')
})

test.serial('Region#findAll', async t => {
  let datacenters = await db.Region.findAll()

  t.true(RegionStub.findAll.called, 'findAll should be called')
  t.true(RegionStub.findAll.calledOnce, 'findAll should be called once')
  t.true(RegionStub.findAll.calledWith(), 'findAll should be called without any args')

  t.deepEqual(datacenters, regionFixtures.findAll, 'Classes should be the same')
})

test.serial('Region#findByDatacenterMain', async t => {
  let datacenters = await db.Region.findByDatacenter(datacenterId)
//   t.true(RegionStub.findAll.called, 'findAll should be called')
//   t.true(RegionStub.findAll.calledOnce, 'findAll should be called once')

  t.deepEqual(datacenters, regionFixtures.findByDatacenterId(datacenterId), 'should be the same')
})
