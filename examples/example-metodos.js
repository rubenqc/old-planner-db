'use strict'

const db = require('..')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'core_datos',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12456789',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  }

  const { Users, Traffic, Gb, CentralizedAnalysis, Th, Sau, Pdp, Uth, Usau, Updp, PdpSau, SauUsers, ThfcPdp, ThfcSau } = await db(config).catch(handleFatalError)

  // GENERAL USERS
  const user = await Users.createOrUpdate({ usuarios: 1256, estado: 0 }, '2018-02-01', 3).catch(handleFatalError)
  const user2 = await Users.createOrUpdate({ usuarios: 2000, estado: 0 }, '2018-03-01', 3).catch(handleFatalError)
  console.log('--create users--')
  console.log(user, user2)

  const users = await Users.findAll().catch(handleFatalError)
  console.log('--total users--')
  console.log(users)
  const now = new Date()
  const rangeUsers = await Users.findByRange('2018-02-01', now, 3, 0).catch(handleFatalError)
  console.log('--rango de users--')
  console.log(rangeUsers)

  // GENERAL TRAFFIC
  const traffic = await Traffic.createOrUpdate({ trafico: 12345678123.2132135468, estado: 0 }, '2018-05-01', 3, 8).catch(handleFatalError)
  const traffic2 = await Traffic.createOrUpdate({ trafico: 78945612322.2132135468, estado: 0 }, '2018-09-01', 3, 8).catch(handleFatalError)
  console.log('--create traffics--')
  console.log(traffic, traffic2)

  const traffics = await Traffic.findAll().catch(handleFatalError)
  console.log('--findAll traffics--')
  console.log(traffics)

  const rangeTraffics = await Traffic.findByRange('2018-05-01', '2018-09-01', 3, 0).catch(handleFatalError)
  console.log('--rangeTraffics--')
  console.log(rangeTraffics)

  // GENERAL GB
  const gb = await Gb.createOrUpdate({ gb: 12345678123.2132135468, estado: 0 }, '2018-05-01', 2, 8).catch(handleFatalError)
  const gb2 = await Gb.createOrUpdate({ gb: 78945612322.2132135468, estado: 0 }, '2018-09-01', 2, 8).catch(handleFatalError)
  console.log('--create gbs--')
  console.log(gb, gb2)

  const gbs = await Gb.findAll().catch(handleFatalError)
  console.log('--findAll gbs--')
  console.log(gbs)

  const rangeGbs = await Gb.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangeGbs--')
  console.log(rangeGbs)

  // GENERAL ANALISIS CENTRALIZADOS
  const analisisCentralizo = await CentralizedAnalysis.createOrUpdate({ th: 12131315644.213545644, pdp: 23165464897987, sau: 135464894653, estado: 0 }, '2018-05-01', 1).catch(handleFatalError)
  const analisisCentralizo2 = await CentralizedAnalysis.createOrUpdate({ th: 92131315644.213545644, pdp: 89784645321321, sau: 465482313215, estado: 0 }, '2018-09-01', 1).catch(handleFatalError)
  console.log('--create analisisCentralizado--')
  console.log(analisisCentralizo, analisisCentralizo2)

  const analisisCentralizados = await CentralizedAnalysis.findAll().catch(handleFatalError)
  console.log('--findAll analisis centralizado--')
  console.log(analisisCentralizados)

  const rangeCentralizedAnalysis = await CentralizedAnalysis.findByRange('2018-05-01', '2018-09-01', 1, 0).catch(handleFatalError)
  console.log('--range analisis centralizado--')
  console.log(rangeCentralizedAnalysis)

  // CORE-PS TH
  const th = await Th.createOrUpdate({ th: 12345678123.2132135468, estado: 0 }, '2018-05-01', 2, 8).catch(handleFatalError)
  const th2 = await Th.createOrUpdate({ th: 78945612322.2132135468, estado: 0 }, '2018-09-01', 2, 8).catch(handleFatalError)
  console.log('--create ths--')
  console.log(th, th2)

  const ths = await Th.findAll().catch(handleFatalError)
  console.log('--findAll ths--')
  console.log(ths)

  const rangeThs = await Th.findByRange('2018-05-01', '2018-09-01', 2, 8, 0).catch(handleFatalError)
  console.log('--rangeThs--')
  console.log(rangeThs)

  // CORE-PS SAU
  const sau = await Sau.createOrUpdate({ sau: 1234567812346, estado: 0 }, '2018-05-01', 2, 8).catch(handleFatalError)
  const sau2 = await Sau.createOrUpdate({ sau: 78945612322465, estado: 0 }, '2018-09-01', 2, 8).catch(handleFatalError)
  console.log('--create saus--')
  console.log(sau, sau2)

  const saus = await Sau.findAll().catch(handleFatalError)
  console.log('--findAll saus--')
  console.log(saus)

  const rangeSaus = await Sau.findByRange('2018-05-01', '2018-09-01', 2, 8, 0).catch(handleFatalError)
  console.log('--rangeSaus--')
  console.log(rangeSaus)

  // CORE-PS PDP
  const pdp = await Pdp.createOrUpdate({ pdp: 1234567812346, estado: 0 }, '2018-05-01', 2, 8).catch(handleFatalError)
  const pdp2 = await Pdp.createOrUpdate({ pdp: 78945612322465, estado: 0 }, '2018-09-01', 2, 8).catch(handleFatalError)
  console.log('--create pdps--')
  console.log(pdp, pdp2)

  const pdps = await Pdp.findAll().catch(handleFatalError)
  console.log('--findAll pdps--')
  console.log(pdps)

  const rangePdps = await Pdp.findByRange('2018-05-01', '2018-09-01', 2, 8, 0).catch(handleFatalError)
  console.log('--rangePdps--')
  console.log(rangePdps)

  // U2000 TH
  const uth = await Uth.createOrUpdate({ th: 1234567812346.5464, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const uth2 = await Uth.createOrUpdate({ th: 78945612322465.5464, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create uths--')
  console.log(uth, uth2)

  const uths = await Uth.findAll().catch(handleFatalError)
  console.log('--findAll uths--')
  console.log(uths)

  const rangeUths = await Uth.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangeUths--')
  console.log(rangeUths)

  // U2000 SAU
  const usau = await Usau.createOrUpdate({ sau: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const usau2 = await Usau.createOrUpdate({ sau: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create usaus--')
  console.log(usau, usau2)

  const usaus = await Usau.findAll().catch(handleFatalError)
  console.log('--findAll usaus--')
  console.log(usaus)

  const rangeUsaus = await Usau.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangeUsaus--')
  console.log(rangeUsaus)

  // U2000 PDP
  const updp = await Updp.createOrUpdate({ pdp: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const updp2 = await Updp.createOrUpdate({ pdp: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create updps--')
  console.log(updp, updp2)

  const updps = await Updp.findAll().catch(handleFatalError)
  console.log('--findAll updps--')
  console.log(updps)

  const rangeUpdps = await Updp.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangeUpdps--')
  console.log(rangeUpdps)

  // RATIOS PDP/SAU
  const pdpsau = await PdpSau.createOrUpdate({ pdp_sau: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const pdpsau2 = await PdpSau.createOrUpdate({ pdp_sau: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create pdpsau7s--')
  console.log(pdpsau, pdpsau2)

  const pdpsaus = await PdpSau.findAll().catch(handleFatalError)
  console.log('--findAll pdpsaus--')
  console.log(pdpsaus)

  const rangePdpSaus = await PdpSau.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangePdpSaus--')
  console.log(rangePdpSaus)

  // RATIOS SAU/USERS
  const sauusers = await SauUsers.createOrUpdate({ sau_usuarios: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const sauusers2 = await SauUsers.createOrUpdate({ sau_usuarios: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create sauusers7s--')
  console.log(sauusers, sauusers2)

  const sauuserss = await SauUsers.findAll().catch(handleFatalError)
  console.log('--findAll sauuserss--')
  console.log(sauuserss)

  const rangeSauUserss = await SauUsers.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangesauuserss--')
  console.log(rangeSauUserss)

  // RATIOS THFC/PDPS
  const thfcpdp = await ThfcPdp.createOrUpdate({ thfc_pdp: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const thfcpdp2 = await ThfcPdp.createOrUpdate({ thfc_pdp: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create thfcpdp7s--')
  console.log(thfcpdp, thfcpdp2)

  const thfcpdps = await ThfcPdp.findAll().catch(handleFatalError)
  console.log('--findAll thfcpdps--')
  console.log(thfcpdps)

  const rangeThfcPdps = await ThfcPdp.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangethfcpdps--')
  console.log(rangeThfcPdps)

  // RATIOS THFC/SAUS
  const thfcsau = await ThfcSau.createOrUpdate({ thfc_sau: 1234567812346, estado: 0 }, '2018-05-01', 2).catch(handleFatalError)
  const thfcsau2 = await ThfcSau.createOrUpdate({ thfc_sau: 78945612322465, estado: 0 }, '2018-09-01', 2).catch(handleFatalError)
  console.log('--create thfcsau7s--')
  console.log(thfcsau, thfcsau2)

  const thfcsaus = await ThfcSau.findAll().catch(handleFatalError)
  console.log('--findAll thfcsaus--')
  console.log(thfcsaus)

  const rangeThfcSaus = await ThfcSau.findByRange('2018-05-01', '2018-09-01', 2, 0).catch(handleFatalError)
  console.log('--rangethfcsaus--')
  console.log(rangeThfcSaus)

  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
