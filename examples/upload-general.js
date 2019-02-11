'use strict'

const db = require('../')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'core_datos',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12456789',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  }

  const { DateFecha, ClassClase, Type, Region, Datacenter, DatacenterMain, Users, Traffic, Gb, CentralizedAnalysis, Th, Sau, Pdp, Uth, Usau, Updp, PdpSau, SauUsers, ThfcPdp, ThfcSau } = await db(config).catch(handleFatalError)

  // generating dates
  const startDate = new Date('2017-01-02')
  const finalDate = new Date('2019-12-02')

  console.log('--dates--')
  while (finalDate.getTime() >= startDate.getTime()) {
    let fecha = await DateFecha.createOrUpdate({ fecha: startDate }).catch(handleFatalError)
    startDate.setMonth(startDate.getMonth() + 1)
    console.log(fecha)
  }

  // generating classes
  const defaultClass = await ClassClase.createOrUpdate({ clase: 0, nombre: 'default/total' }).catch(handleFatalError)
  const bafi = await ClassClase.createOrUpdate({ clase: 1, nombre: 'bafi' }).catch(handleFatalError)
  const movil = await ClassClase.createOrUpdate({ clase: 2, nombre: 'movil' }).catch(handleFatalError)

  console.log('--classes--')
  console.log(defaultClass, bafi, movil)

  // generating types
  const defaultType = await Type.createOrUpdate({ tipo: 0, nombre: 'default/total' }, 0).catch(handleFatalError)
  const aws = await Type.createOrUpdate({ tipo: 1, nombre: '4G AWS' }, bafi.clase).catch(handleFatalError)
  const dosTres = await Type.createOrUpdate({ tipo: 2, nombre: '4G 2300/3500' }, bafi.clase).catch(handleFatalError)
  const dosG = await Type.createOrUpdate({ tipo: 3, nombre: '2G' }, movil.clase).catch(handleFatalError)
  const tresG = await Type.createOrUpdate({ tipo: 4, nombre: '3G' }, movil.clase).catch(handleFatalError)
  const cuatroG = await Type.createOrUpdate({ tipo: 5, nombre: '4G' }, movil.clase).catch(handleFatalError)

  console.log('--types--')
  console.log(defaultType, aws, dosTres, dosG, tresG, cuatroG)

  // generating datacentersMain
  const defaultDatacenterMain = await DatacenterMain.createOrUpdate({ dc_principal: 0, nombre: 'default/total', tipo: 0 }).catch(handleFatalError)
  const edgeTrujilloMain = await DatacenterMain.createOrUpdate({ dc_principal: 1, nombre: 'DC Edge Trujillo', tipo: 2 }).catch(handleFatalError)
  const coreLimaMain = await DatacenterMain.createOrUpdate({ dc_principal: 2, nombre: 'DC Core Lima', tipo: 1 }).catch(handleFatalError)
  const edgeJuninMain = await DatacenterMain.createOrUpdate({ dc_principal: 3, nombre: 'DC Edge Junin', tipo: 2 }).catch(handleFatalError)
  const edgeArequipaMain = await DatacenterMain.createOrUpdate({ dc_principal: 4, nombre: 'DC Edge Arequipa', tipo: 2 }).catch(handleFatalError)
  const accessLoretoMain = await DatacenterMain.createOrUpdate({ dc_principal: 5, nombre: 'DC Access Loreto', tipo: 3 }).catch(handleFatalError)

  console.log('--datacentersMain--')
  console.log(defaultDatacenterMain, edgeTrujilloMain, coreLimaMain, edgeJuninMain, edgeArequipaMain, accessLoretoMain)
  console.log('vamos a saber la verdad', defaultDatacenterMain.dc_principal)
  // generating datacenters
  const defaultDatacenter = await Datacenter.createOrUpdate({ datacenter: 0, nombre: 'default/total', tipo: 0 }, defaultDatacenterMain.dc_principal).catch(handleFatalError)
  const edgeTrujillo = await Datacenter.createOrUpdate({ datacenter: 1, nombre: 'DC Edge Trujillo', tipo: 2 }, edgeTrujilloMain.dc_principal).catch(handleFatalError)
  const accessLambayeque = await Datacenter.createOrUpdate({ datacenter: 2, nombre: 'DC Access Lambayeque', tipo: 3 }, edgeTrujilloMain.dc_principal).catch(handleFatalError)
  const accessPiura = await Datacenter.createOrUpdate({ datacenter: 3, nombre: 'DC Access Piura', tipo: 3 }, edgeTrujilloMain.dc_principal).catch(handleFatalError)
  const accessAncash = await Datacenter.createOrUpdate({ datacenter: 4, nombre: 'DC Access Ancash', tipo: 3 }, edgeTrujilloMain.dc_principal).catch(handleFatalError)
  const accessCajamarca = await Datacenter.createOrUpdate({ datacenter: 5, nombre: 'DC Access Cajamarca', tipo: 3 }, edgeTrujilloMain.dc_principal).catch(handleFatalError)
  const coreLima = await Datacenter.createOrUpdate({ datacenter: 6, nombre: 'DC Core Lima', tipo: 1 }, coreLimaMain.dc_principal).catch(handleFatalError)
  const accessIca = await Datacenter.createOrUpdate({ datacenter: 7, nombre: 'DC Access Ica', tipo: 3 }, coreLimaMain.dc_principal).catch(handleFatalError)
  const edgeJunin = await Datacenter.createOrUpdate({ datacenter: 8, nombre: 'DC Edge Junin', tipo: 2 }, edgeJuninMain.dc_principal).catch(handleFatalError)
  const edgeArequipa = await Datacenter.createOrUpdate({ datacenter: 9, nombre: 'DC Edge Arequipa', tipo: 2 }, edgeArequipaMain.dc_principal).catch(handleFatalError)
  const accessCusco = await Datacenter.createOrUpdate({ datacenter: 10, nombre: 'DC Access Cusco', tipo: 3 }, edgeArequipaMain.dc_principal).catch(handleFatalError)
  const accessLoreto = await Datacenter.createOrUpdate({ datacenter: 11, nombre: 'DC Access Loreto', tipo: 3 }, accessLoretoMain.dc_principal).catch(handleFatalError)

  console.log('--datacenters--')
  console.log(defaultDatacenter, edgeTrujillo, accessLambayeque, accessPiura, accessAncash, accessCajamarca, coreLima, accessIca, edgeJunin, edgeArequipa, accessCusco, accessLoreto)
  console.log('--probando errores--')
  console.log(defaultDatacenter)

  // generating regions
  const defaultRegion = await Region.createOrUpdate({ region: 0, nombre: 'default/total' }, defaultDatacenter.datacenter).catch(handleFatalError)
  const laLibertad = await Region.createOrUpdate({ region: 1, nombre: 'La Libertad' }, edgeTrujillo.datacenter).catch(handleFatalError)
  const sanMartin = await Region.createOrUpdate({ region: 2, nombre: 'San Martin' }, edgeTrujillo.datacenter).catch(handleFatalError)
  const lambayeque = await Region.createOrUpdate({ region: 3, nombre: 'Lambayeque' }, accessLambayeque.datacenter).catch(handleFatalError)
  const piura = await Region.createOrUpdate({ region: 4, nombre: 'Piura' }, accessPiura.datacenter).catch(handleFatalError)
  const tumbes = await Region.createOrUpdate({ region: 5, nombre: 'Tumbes' }, accessPiura.datacenter).catch(handleFatalError)
  const ancash = await Region.createOrUpdate({ region: 6, nombre: 'Ancash' }, accessAncash.datacenter).catch(handleFatalError)
  const cajamarca = await Region.createOrUpdate({ region: 7, nombre: 'Cajamarca' }, accessCajamarca.datacenter).catch(handleFatalError)
  const amazonas = await Region.createOrUpdate({ region: 8, nombre: 'Amazonas' }, accessCajamarca.datacenter).catch(handleFatalError)
  const lima = await Region.createOrUpdate({ region: 9, nombre: 'Lima' }, coreLima.datacenter).catch(handleFatalError)
  const ica = await Region.createOrUpdate({ region: 10, nombre: 'Ica' }, accessIca.datacenter).catch(handleFatalError)
  const junin = await Region.createOrUpdate({ region: 11, nombre: 'Junin' }, edgeJunin.datacenter).catch(handleFatalError)
  const ayacucho = await Region.createOrUpdate({ region: 12, nombre: 'Ayacucho' }, edgeJunin.datacenter).catch(handleFatalError)
  const huancavelica = await Region.createOrUpdate({ region: 13, nombre: 'Huancavelica' }, edgeJunin.datacenter).catch(handleFatalError)
  const huanuco = await Region.createOrUpdate({ region: 14, nombre: 'Huanuco' }, edgeJunin.datacenter).catch(handleFatalError)
  const pasco = await Region.createOrUpdate({ region: 15, nombre: 'Pasco' }, edgeJunin.datacenter).catch(handleFatalError)
  const ucayali = await Region.createOrUpdate({ region: 16, nombre: 'Ucayali' }, edgeJunin.datacenter).catch(handleFatalError)
  const arequipa = await Region.createOrUpdate({ region: 17, nombre: 'Arequipa' }, edgeArequipa.datacenter).catch(handleFatalError)
  const madreDeDios = await Region.createOrUpdate({ region: 18, nombre: 'Madre de Dios' }, edgeArequipa.datacenter).catch(handleFatalError)
  const moquehua = await Region.createOrUpdate({ region: 19, nombre: 'Moquehua' }, edgeArequipa.datacenter).catch(handleFatalError)
  const puno = await Region.createOrUpdate({ region: 20, nombre: 'Puno' }, edgeArequipa.datacenter).catch(handleFatalError)
  const tacna = await Region.createOrUpdate({ region: 21, nombre: 'Tacna' }, edgeArequipa.datacenter).catch(handleFatalError)
  const cusco = await Region.createOrUpdate({ region: 22, nombre: 'Cusco' }, accessCusco.datacenter).catch(handleFatalError)
  const apurimac = await Region.createOrUpdate({ region: 23, nombre: 'Apurimac' }, accessCusco.datacenter).catch(handleFatalError)
  const loreto = await Region.createOrUpdate({ region: 24, nombre: 'Loreto' }, accessLoreto.datacenter).catch(handleFatalError)

  console.log('--regiones--')
  console.log(defaultRegion, laLibertad, sanMartin, lambayeque, piura, tumbes, ancash, cajamarca, amazonas, lima, ica, junin, ayacucho, huancavelica, huanuco, pasco, ucayali, arequipa, madreDeDios, moquehua, puno, tacna, cusco, apurimac, loreto)

  // examples findAll

  const clases = await ClassClase.findAll().catch(handleFatalError)
  console.log(clases)

  const tipos = await Type.findAll().catch(handleFatalError)
  console.log(tipos)

  const datacentersMain = await DatacenterMain.findAll().catch(handleFatalError)
  console.log(datacentersMain)

  const datacenters = await Datacenter.findAll().catch(handleFatalError)
  console.log(datacenters)

  const regiones = await Region.findAll().catch(handleFatalError)
  console.log(regiones)

  // example TypeModel#findByClass
  const types = await Type.findByClass(1).catch(handleFatalError)
  console.log(types)

  // example DatacenterModel#findByDatacenterMain
  const datacenters2 = await Datacenter.findByDatacenterMain(1).catch(handleFatalError)
  console.log(datacenters2)

  // example RegionModel#findByDatacenter
  const regions = await Region.findByDatacenter(8).catch(handleFatalError)
  console.log(regions)

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
