'use strict'

const setupDatabase = require('./lib/db')
const setupUsersModel = require('./models/users')
const setupTrafficModel = require('./models/traffic')
const setupDateModel = require('./models/date')
const setupTypeModel = require('./models/type')
const setupClassModel = require('./models/class')
const setupRegionModel = require('./models/region')
const setupDatacenterModel = require('./models/datacenter')
const setupDatacenterMainModel = require('./models/datacenter_main')
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
