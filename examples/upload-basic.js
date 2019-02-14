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

  const { DateFecha, ClassClase, Type, Region, Datacenter, DatacenterMain } = await db(config).catch(handleFatalError)

  // generating dates
  const startDate = new Date('2017-01-02')
  const finalDate = new Date('2030-12-02')

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

  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
