'use strict'

const db = require('..')
const excelToJson = require('convert-excel-to-json')
const zerofill = require('zero-fill')

const config = {
  database: process.env.DB_NAME || 'core_datos',
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || '12456789',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
}

const regiones = {
  'La Libertad': 1,
  'San Martin': 2,
  Lambayeque: 3,
  Piura: 4,
  Tumbes: 5,
  Ancash: 6,
  Cajamarca: 7,
  Amazonas: 8,
  Lima: 9,
  Ica: 10,
  Junin: 11,
  Ayacucho: 12,
  Huancavelica: 13,
  Huanuco: 14,
  Pasco: 15,
  Ucayali: 16,
  Arequipa: 17,
  'Madre de Dios': 18,
  Moquegua: 19,
  Puno: 20,
  Tacna: 21,
  Cusco: 22,
  Apurimac: 23,
  Loreto: 24
}

function setDate (fechas) {
  return `${fechas.getUTCFullYear()}-${zerofill(2, fechas.getUTCMonth() + 1)}-${zerofill(2, fechas.getUTCDate())}`
}

// save params factor s real
const factorS = excelToJson({
  sourceFile: './all/real-test-th.xlsx'
})

const factorSFc = excelToJson({
  sourceFile: './all/fc-test-th.xlsx'
})

// cargar la data
async function dates () {
  const fechasFC = factorSFc.data[0]
  const valoresFC = factorSFc.data[1]

  const fechas = factorS.data[0]
  const valores = factorS.data[1]

  const { DateFecha } = await db(config).catch(handleFatalError)

  for (const prop in valores) {
    if (prop !== 'A') {
      let fecha = await DateFecha.createOrUpdate({
        fecha: `${fechas[prop].getUTCFullYear()}-${zerofill(2, fechas[prop].getUTCMonth() + 1)}-${zerofill(2, fechas[prop].getUTCDate())}`,
        factor_s: valores[prop],
        estado: 1
      }).catch(handleFatalError)

      console.log(fecha)
    }
  }

  for (const prop in valoresFC) {
    if (prop !== 'A') {
      let fechaFc = await DateFecha.createOrUpdate({
        fecha: `${fechasFC[prop].getUTCFullYear()}-${zerofill(2, fechasFC[prop].getUTCMonth() + 1)}-${zerofill(2, fechasFC[prop].getUTCDate())}`,
        factor_s: valoresFC[prop],
        estado: 180717
      })

      console.log(fechaFc)
    }
  }
  process.exit(0)
}

// th real
const th = excelToJson({
  sourceFile: './all/real-test-th.xlsx'
})

async function ths () {
  const fechas = th.data[0]

  const { Th } = await db(config).catch(handleFatalError)

  for (let i = 3; i <= 26; i++) {
    let valores = th.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultTh = await Th.createOrUpdate({
          th: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultTh)
      }
    }
  }
  for (let i = 30; i <= 54; i++) {
    let valores = th.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultTh = await Th.createOrUpdate({
          th: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultTh)
      }
    }
  }
  process.exit(0)
}

// th fc
const thFC = excelToJson({
  sourceFile: './all/fc-test-th.xlsx'
})

async function thFCs () {
  const fechas = thFC.data[0]

  const { Th } = await db(config).catch(handleFatalError)

  for (let i = 3; i <= 26; i++) {
    let valores = thFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultTh = await Th.createOrUpdate({
          th: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultTh)
      }
    }
  }

  // let enomine = []

  for (let i = 30; i <= 53; i++) {
    let valores = thFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        // if (!(fechas[prop] && regiones[valores['A']] && valores[prop])) {
        //   console.log(fechas[prop])
        //   console.log(regiones[valores['A']])
        //   console.log(valores[prop])
        //   process.exit(0)
        // }
        let resultTh = await Th.createOrUpdate({
          th: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultTh)
      }
    }
    // enomine = [...enomine, regiones[valores['A']]]
  }
  // console.log(enomine)
  process.exit(0)
}

// sau real  ############################################################################333
const sau = excelToJson({
  sourceFile: './all/real-test-sau.xlsx'
})

async function saus () {
  const fechas = sau.data[0]

  const { Sau } = await db(config).catch(handleFatalError)

  for (let i = 2; i <= 25; i++) {
    let valores = sau.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultSau = await Sau.createOrUpdate({
          sau: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultSau)
      }
    }
  }
  for (let i = 27; i <= 50; i++) {
    let valores = sau.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultSau = await Sau.createOrUpdate({
          sau: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultSau)
      }
    }
  }
  process.exit(0)
}

// sau fc ####################################################3
const sauFC = excelToJson({
  sourceFile: './all/fc-test-sau.xlsx'
})

async function sauFCs () {
  const fechas = sauFC.data[0]

  const { Sau } = await db(config).catch(handleFatalError)

  for (let i = 2; i <= 25; i++) {
    let valores = sauFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultSau = await Sau.createOrUpdate({
          sau: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultSau)
      }
    }
  }

  // let enomine = []

  for (let i = 27; i <= 50; i++) {
    let valores = sauFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        // if (!(fechas[prop] && regiones[valores['A']] && valores[prop])) {
        //   console.log(fechas[prop])
        //   console.log(regiones[valores['A']])
        //   console.log(valores[prop])
        //   process.exit(0)
        // }
        let resultSau = await Sau.createOrUpdate({
          sau: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultSau)
      }
    }
    // enomine = [...enomine, regiones[valores['A']]]
  }
  // console.log(enomine)
  process.exit(0)
}

// pdp real ############################################################################################33
const pdp = excelToJson({
  sourceFile: './all/real-test-pdp.xlsx'
})

async function pdps () {
  const fechas = pdp.data[0]

  const { Pdp } = await db(config).catch(handleFatalError)

  for (let i = 1; i <= 25; i++) {
    let valores = pdp.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultPdp = await Pdp.createOrUpdate({
          pdp: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultPdp)
      }
    }
  }
  for (let i = 27; i <= 50; i++) {
    let valores = pdp.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultPdp = await Pdp.createOrUpdate({
          pdp: valores[prop],
          estado: 1
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultPdp)
      }
    }
  }
  process.exit(0)
}

// pdp fc ################################################################################33
const pdpFC = excelToJson({
  sourceFile: './all/fc-test-pdp.xlsx'
})

async function pdpFCs () {
  const fechas = pdpFC.data[0]

  const { Pdp } = await db(config).catch(handleFatalError)

  for (let i = 1; i <= 25; i++) {
    let valores = pdpFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        let resultPdp = await Pdp.createOrUpdate({
          pdp: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 2, regiones[valores['A']]).catch(handleFatalError) // movil
        console.log(resultPdp)
      }
    }
  }

  // let enomine = []

  for (let i = 27; i <= 50; i++) {
    let valores = pdpFC.data[i]
    for (const prop in valores) {
      if (prop !== 'A' && prop !== 'B') {
        // if (!(fechas[prop] && regiones[valores['A']] && valores[prop])) {
        //   console.log(fechas[prop])
        //   console.log(regiones[valores['A']])
        //   console.log(valores[prop])
        //   process.exit(0)
        // }
        let resultPdp = await Pdp.createOrUpdate({
          pdp: valores[prop],
          estado: 180717
        }, setDate(fechas[prop]), 1, regiones[valores['A']]) // fijo

        console.log(resultPdp)
      }
    }
    // enomine = [...enomine, regiones[valores['A']]]
  }
  // console.log(enomine)
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

dates()
// ths()
// thFCs()
// saus()
// sauFCs()
// pdps()
// pdpFCs()
