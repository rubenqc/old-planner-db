'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const classFixtures = require('./fixtures/class')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let ClassStub = null

// general
let DateStub = {
  hasMany: sinon.spy()
}
let TypeStub = {
  belongsTo: sinon.spy(),
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

let clase = 1
let condArgs = {
  where: {
    clase
  }
}
let newClass = {
  clase: 3,
  nombre: 'no-existes'
}
let newCondArgs = {
  where: {
    clase: newClass.clase
  }
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  ClassStub = {
    hasMany: sandbox.spy()
  }

  // Class#Model findOne Stub
  ClassStub.findOne = sandbox.stub()
  ClassStub.findOne.withArgs(condArgs).returns(Promise.resolve(classFixtures.single))

  // Class#Model update Stub
  ClassStub.update = sandbox.stub()
  ClassStub.update.withArgs(classFixtures.single, condArgs).returns(Promise.resolve(classFixtures.single))

  // Class#Model create Stub
  ClassStub.create = sandbox.stub()
  ClassStub.create.withArgs(newClass).returns(Promise.resolve({
    toJSON () {
      return newClass
    }
  }))

  // Class#Model findAll Stub
  ClassStub.findAll = sandbox.stub()
  ClassStub.findAll.withArgs().returns(Promise.resolve(classFixtures.findAll))

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

test('Class', t => {
  t.truthy(db.ClassClase, 'Class service should exits.')
})

test('Setup', t => {
  t.true(ClassStub.hasMany.called, 'ClassModel.hasMany was executed')
  t.true(ClassStub.hasMany.callCount === 15, 'hasMany should be called 13 times')
  t.true(ClassStub.hasMany.calledWith(UsersStub), 'Argument needs should be UsersModel')
  t.true(ClassStub.hasMany.calledWith(TrafficStub), 'Argument needs should be TrafficModel')
  t.true(ClassStub.hasMany.calledWith(TypeStub), 'Argument needs should be TypeModel')
  t.true(ClassStub.hasMany.calledWith(GbStub), 'Argument needs should be GbModel')
  t.true(ClassStub.hasMany.calledWith(CentralizedAnalysisStub), 'Argument needs should be CentralizedAnalysisModel')
  t.true(ClassStub.hasMany.calledWith(ThStub), 'Argument needs should be ThModel')
  t.true(ClassStub.hasMany.calledWith(SauStub), 'Argument needs should be SauModel')
  t.true(ClassStub.hasMany.calledWith(PdpStub), 'Argument needs should be PdpModel')
  t.true(ClassStub.hasMany.calledWith(UthStub), 'Argument needs should be UthModel')
  t.true(ClassStub.hasMany.calledWith(UsauStub), 'Argument needs should be UsauModel')
  t.true(ClassStub.hasMany.calledWith(UpdpStub), 'Argument needs should be UpdpModel')
  t.true(ClassStub.hasMany.calledWith(SauUsersStub), 'Argument needs should be SauUsersModel')
  t.true(ClassStub.hasMany.calledWith(PdpSauStub), 'Argument needs should be PdpSauModel')
  t.true(ClassStub.hasMany.calledWith(ThfcPdpStub), 'Argument needs should be ThfcPdpModel')
  t.true(ClassStub.hasMany.calledWith(ThfcSauStub), 'Argument needs should be ThfcSauModel')
})

test.serial('Class#createOrUpdate - exists', async t => {
  let clase = await db.ClassClase.createOrUpdate(classFixtures.single)

  t.true(ClassStub.findOne.called, 'findOne should be called on model')
  t.true(ClassStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(ClassStub.findOne.calledWith(condArgs), 'findOne should be called with cond Args')
  t.true(ClassStub.update.called, 'update should be called')
  t.true(ClassStub.update.calledOnce, 'update should be called once')
  t.true(ClassStub.update.calledWith(classFixtures.single, condArgs), 'update should be called with single, cond Args')

  t.deepEqual(clase, classFixtures.single, 'should be the same')
})

test.serial('Class#createOrUpdate - new', async t => {
  let clase = await db.ClassClase.createOrUpdate(newClass)

  t.true(ClassStub.findOne.called, 'findOne should be called')
  t.true(ClassStub.findOne.calledOnce, 'findOne should be called once')
  t.true(ClassStub.findOne.calledWith(newCondArgs), 'findOne should be called with newCond Args')
  t.true(ClassStub.create.called, 'create should be called')
  t.true(ClassStub.create.calledOnce, 'create should be called once')
  t.true(ClassStub.create.calledWith(newClass), 'create should be called with newClass args')

  t.deepEqual(clase, newClass, 'should be the same')
})

test.serial('Class#findAll', async t => {
  let clases = await db.ClassClase.findAll()

  t.true(ClassStub.findAll.called, 'findAll should be called')
  t.true(ClassStub.findAll.calledOnce, 'findAll should be called once')
  t.true(ClassStub.findAll.calledWith(), 'findAll should be called without any args')

  t.deepEqual(clases, classFixtures.findAll, 'Classes should be the same')
})
