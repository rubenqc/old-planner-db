'use strict'

const setupDatabase = require('./lib/db')

const setupUsersModel = require('./models/users')
const setupTrafficModel = require('./models/traffic')

const setupDateModel = require('./models/general/date')
const setupTypeModel = require('./models/general/type')
const setupClassModel = require('./models/general/class')
const setupRegionModel = require('./models/general/region')
const setupDatacenterModel = require('./models/general/datacenter')
const setupDatacenterMainModel = require('./models/general/datacenter_main')

const setupPdpModel = require('./models/core-ps/pdp')
const setupSauModel = require('./models/core-ps/sau')
const setupThModel = require('./models/core-ps/th')

const setupUthModel = require('./models/u2000/th')
const setupUpdpModel = require('./models/u2000/pdp')
const setupUsauModel = require('./models/u2000/sau')

const setupPdpSauModel = require('./models/ratios/pdp_ sau')
const setupSauUsersModel = require('./models/ratios/sau_users')
const setupThfcSauModel = require('./models/ratios/thfc_sau')
const setupThfcPdpModel = require('./models/ratios/thfc_pdp')

const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    },
    operatorsAliases: false
  })

  const sequelize = setupDatabase(config)

  const UsersModel = setupUsersModel(config)
  const TrafficModel = setupTrafficModel(config)

  const DateModel = setupDateModel(config)
  const TypeModel = setupTypeModel(config)
  const ClassModel = setupClassModel(config)
  const RegionModel = setupRegionModel(config)
  const DatacenterModel = setupDatacenterModel(config)
  const DatacenterMainModel = setupDatacenterMainModel(config)

  const ThModel = setupThModel(config)
  const PdpModel = setupPdpModel(config)
  const SauModel = setupSauModel(config)

  const UthModel = setupUthModel(config)
  const UsauModel = setupUsauModel(config)
  const UpdpModel = setupUpdpModel(config)

  const PdpSauModel = setupPdpSauModel(config)
  const SauUsersModel = setupSauUsersModel(config)
  const ThfcPdpModel = setupThfcPdpModel(config)
  const ThfcSauModel = setupThfcSauModel(config)

  ClassModel.hasMany(TypeModel)
  TypeModel.belongsTo(ClassModel)

  DatacenterModel.hasMany(RegionModel)
  RegionModel.belongsTo(DatacenterModel)

  DatacenterMainModel.hasMany(DatacenterModel)
  DatacenterModel.belongsTo(DatacenterMainModel)

  // Associations UserModel
  DateModel.hasMany(UsersModel)
  UsersModel.belongsTo(DateModel)

  TypeModel.hasMany(UsersModel)
  UsersModel.belongsTo(TypeModel)

  RegionModel.hasMany(UsersModel)
  UsersModel.belongsTo(RegionModel)

  // Associations TrafficModel
  DateModel.hasMany(TrafficModel)
  TrafficModel.belongsTo(DateModel)

  TypeModel.hasMany(TrafficModel)
  TrafficModel.belongsTo(TypeModel)

  RegionModel.hasMany(TrafficModel)
  TrafficModel.belongsTo(RegionModel)

  // Associations core-ps: TH
  DateModel.hasMany(ThModel)
  ThModel.belongsTo(DateModel)

  ClassModel.hasMany(ThModel)
  ThModel.belongsTo(ClassModel)

  RegionModel.hasMany(ThModel)
  ThModel.belongsTo(RegionModel)

  // Associations core-ps: SAU
  DateModel.hasMany(SauModel)
  SauModel.belongsTo(DateModel)

  ClassModel.hasMany(SauModel)
  SauModel.belongsTo(ClassModel)

  RegionModel.hasMany(SauModel)
  SauModel.belongsTo(RegionModel)

  // Associations core-ps: PDP
  DateModel.hasMany(PdpModel)
  PdpModel.belongsTo(DateModel)

  ClassModel.hasMany(PdpModel)
  PdpModel.belongsTo(ClassModel)

  RegionModel.hasMany(PdpModel)
  PdpModel.belongsTo(RegionModel)

  // Associations core-ps U2000: TH
  DateModel.hasMany(UthModel)
  UthModel.belongsTo(DateModel)

  ClassModel.hasMany(UthModel)
  UthModel.belongsTo(ClassModel)

  // Associations core-ps U2000: SAU
  DateModel.hasMany(UsauModel)
  UsauModel.belongsTo(DateModel)

  ClassModel.hasMany(UsauModel)
  UsauModel.belongsTo(ClassModel)

  // Associations core-ps U2000: PDP
  DateModel.hasMany(UpdpModel)
  UpdpModel.belongsTo(DateModel)

  ClassModel.hasMany(UpdpModel)
  UpdpModel.belongsTo(ClassModel)

  // Associations core-ps Ratios: SAU/Usuario
  DateModel.hasMany(SauUsersModel)
  SauUsersModel.belongsTo(DateModel)

  ClassModel.hasMany(SauUsersModel)
  SauUsersModel.belongsTo(ClassModel)

  // Associations core-ps Ratios: PDP/SAU
  DateModel.hasMany(PdpSauModel)
  PdpSauModel.belongsTo(DateModel)

  ClassModel.hasMany(PdpSauModel)
  PdpSauModel.belongsTo(ClassModel)

  // Associations core-ps Ratios: TH_FC/SAU
  DateModel.hasMany(ThfcSauModel)
  ThfcSauModel.belongsTo(DateModel)

  ClassModel.hasMany(ThfcSauModel)
  ThfcSauModel.belongsTo(ClassModel)

  // Associations core-ps Ratios: TH_FC/PDP
  DateModel.hasMany(ThfcPdpModel)
  ThfcPdpModel.belongsTo(DateModel)

  ClassModel.hasMany(ThfcPdpModel)
  ThfcPdpModel.belongsTo(ClassModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  // const Agent = setupAgent(AgentModel)
  // const Metric = setupMetric(MetricModel, AgentModel)

  return {
    // Agent,
    // Metric
  }
}
