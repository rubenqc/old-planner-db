'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const typeFixtures = require('./fixtures/type')
const classFixtures = require('./fixtures/class')

let config = {
  logging: function () {}
}

let db = null
let sandbox = null
let TypeStub = null
let ClassStub = null

// general
let DateStub = {
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

// Argumentos para la clase
let classId = 1
let condArgs = {
  where: {
    clase: classId
  }
}
// Argumentos para el tipo
let newType = {
  tipo: 9,
  nombre: 'no-existes'
}
let newCondArgs = {
  where: {
    tipo: newType.tipo
  }
}

let newClassId = 3
let newCondClass = {
  where: {
    clase: newClassId
  }
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  TypeStub = {
    hasMany: sandbox.spy(),
    belongsTo: sandbox.spy()
  }
  ClassStub = {
    hasMany: sandbox.spy()
  }

  // Class#Model findOne Stub
  ClassStub.findOne = sandbox.stub()
  ClassStub.findOne.withArgs(condArgs).returns(Promise.resolve(classFixtures.findByClass(classId)))
  ClassStub.findOne.withArgs(newCondClass).returns(Promise.resolve(classFixtures.findByClass(newClassId)))
  // Type#Model findOne Stub
  TypeStub.findOne = sandbox.stub()
  TypeStub.findOne.withArgs({ where: { tipo: typeFixtures.single.tipo } }).returns(Promise.resolve(typeFixtures.single))
  // Type#Model update Stub
  TypeStub.update = sandbox.stub()
  TypeStub.update.withArgs(typeFixtures.single, { where: { tipo: typeFixtures.single.tipo } }).returns(Promise.resolve(typeFixtures.single))
  // Type#Model create Stub
  TypeStub.create = sandbox.stub()
  TypeStub.create.withArgs(newType).returns(Promise.resolve({
    toJSON () {
      return newType
    }
  }))
  // Type#Model findAll Stub
  TypeStub.findAll = sandbox.stub()
  TypeStub.findAll.withArgs().returns(Promise.resolve(typeFixtures.findAll))
  TypeStub.findAll.withArgs({
    attributes: ['tipo', 'nombre'],
    group: ['tipo'],
    include: [{
      attributes: [],
      model: ClassStub,
      where: {
        clase: classId
      }
    }],
    raw: true
  }).returns(Promise.resolve(typeFixtures.findByClassId(classId)))

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

test.serial('Type#createOrUpdate - exist', async t => {
  const type = await db.Type.createOrUpdate(typeFixtures.single, classId)

  t.true(ClassStub.findOne.called, 'ClassModel.findOne was execute')
  t.true(ClassStub.findOne.calledOnce, ' findOne should be called once')
  t.true(ClassStub.findOne.calledWith(condArgs), 'findOne should be called with condArgs args')
  t.true(TypeStub.findOne.called, 'TypeModel.findOne was execute')
  t.true(TypeStub.findOne.calledTwice, 'findOne should be called twice')
  t.true(TypeStub.findOne.calledWith({ where: { tipo: typeFixtures.single.tipo } }), 'findOne should be called with tipo Args')
  t.true(TypeStub.update.called, 'update should be called')
  t.true(TypeStub.update.calledOnce, 'update should be called once')
  t.true(TypeStub.update.calledWith(typeFixtures.single, { where: { tipo: typeFixtures.single.tipo } }), 'update should be called with single, cond Args')

  t.deepEqual(type, typeFixtures.single, 'should be the same')
})

test.serial('Type#createOrUpdate - new', async t => {
  const type = await db.Type.createOrUpdate(newType, classId)

  t.true(ClassStub.findOne.called, 'ClassModel.findOne was execute')
  t.true(ClassStub.findOne.calledOnce, ' findOne should be called once')
  t.true(ClassStub.findOne.calledWith(condArgs), 'findOne should be called with condArgs args')
  t.true(TypeStub.findOne.called, 'findOne should be called')
  t.true(TypeStub.findOne.calledOnce, 'findOne should be called once')
  t.true(TypeStub.findOne.calledWith(newCondArgs), 'findOne should be called with newCond Args')
  t.true(TypeStub.create.called, 'create should be called')
  t.true(TypeStub.create.calledOnce, 'create should be called once')
  t.true(TypeStub.create.calledWith(newType), 'create should be called with newClass args')

  t.deepEqual(type, newType, 'should be the same')
})

test.serial('Type#createOrUpdate - class no exist', async t => {
  const type = await db.Type.createOrUpdate(newType, newClassId)

  t.true(ClassStub.findOne.called, 'ClassModel.findOne was execute')
  t.true(ClassStub.findOne.calledOnce, ' findOne should be called once')
  t.true(ClassStub.findOne.calledWith(newCondClass), 'findOne should be called with condArgs args')

  t.deepEqual(type, 1, 'should be the same')
})

test.serial('Type#findAll', async t => {
  let types = await db.Type.findAll()

  t.true(TypeStub.findAll.called, 'findAll should be called')
  t.true(TypeStub.findAll.calledOnce, 'findAll should be called once')
  t.true(TypeStub.findAll.calledWith(), 'findAll should be called without any args')

  t.deepEqual(types, typeFixtures.findAll, 'Classes should be the same')
})

test.serial('Type#findByClass', async t => {
  let types = await db.Type.findByClass(classId)

  t.true(TypeStub.findAll.called, 'findAll should be called')
  t.true(TypeStub.findAll.calledOnce, 'findAll should be called once')

  t.deepEqual(types, typeFixtures.findByClassId(classId), 'types should be the same')
})
