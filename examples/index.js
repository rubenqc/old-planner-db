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

  const { DateFecha } = await db(config).catch(handleFatalError)

  const date = await DateFecha.createOrUpdate({
    fecha: '2018-05-01'
  }).catch(handleFatalError)

  console.log('--date--')
  console.log(date)

  
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
