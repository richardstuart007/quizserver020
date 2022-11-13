//
//  Libraries
//
const express = require('express')
const knex = require('knex')
const { format } = require('date-fns')
//
//  Sub components
//
const serverRaw = require('../controllers/serverRaw')
const serverRegister = require('../controllers/serverRegister')
const serverSignin = require('../controllers/serverSignin')
const serverTest = require('../controllers/serverTest')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const quizserver = 'server20'
const debugLog = true
//
// Constants
//
const {
  L20_KNEX_PORT,
  L20_KNEX_CLIENT,
  L20_KNEX_HOST,
  L20_KNEX_USER,
  L20_KNEX_PWD,
  L20_KNEX_DATABASE,
  L20_PORT,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER,
  URL_TEST,
  CORS_WHITELIST
} = require('../constants.js')
//
// Knex
//
const db = knex({
  client: L20_KNEX_CLIENT,
  connection: {
    host: L20_KNEX_HOST,
    port: L20_KNEX_PORT,
    user: L20_KNEX_USER,
    password: L20_KNEX_PWD,
    database: L20_KNEX_DATABASE
  }
})
//
//  Connection log
//
console.log(
  `Database Connection==> Client(${L20_KNEX_CLIENT}) host(${L20_KNEX_HOST}) port(${L20_KNEX_PORT}) user(${L20_KNEX_USER}) database(${L20_KNEX_DATABASE})`
)
//
// Express
//
const app = express()
app.use(express.json())
//
//  CORS Middleware
//
app.use((req, res, next) => {
  const headers = req.headers
  if (debugLog) console.log('headers ', headers)
  const body = req.body
  if (debugLog) console.log('body ', body)
  const origin = req.headers.origin
  if (debugLog) console.log('origin ', origin)
  const corsWhitelist = CORS_WHITELIST
  if (debugLog) console.log('corsWhitelist ', corsWhitelist)
  //
  //  OK ?
  //
  let OriginOK = false
  if (corsWhitelist.includes(origin) || !origin) {
    OriginOK = true
  }

  if (OriginOK) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    if (debugLog) console.log('In whitelist ')
    else {
      if (debugLog) console.log('NOT In whitelist')
      return
    }
  }
  next()
})
//.............................................................................
//.  Routes - Test
//.............................................................................
app.post(URL_TEST, (req, res) => {
  logRawTables(req, 'POST', 'TEST', 'serverTest')
  serverTest.serverTest(req, res, logCounter)
  res.set('Access-Control-Allow-Origin', '*')
})
//.............................................................................
//.  Routes - Tables
//.............................................................................
app.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
  res.set('Access-Control-Allow-Origin', '*')
})

app.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
  res.set('Access-Control-Allow-Origin', '*')
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
app.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
  res.set('Access-Control-Allow-Origin', '*')
})

app.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  serverRegister.serverRegister(req, res, db, logCounter)
  res.set('Access-Control-Allow-Origin', '*')
})
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} QuizServer(${quizserver}) running on PORT(${L20_PORT})`
app.listen(L20_PORT, () => {
  console.log(logMessage)
})
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawTables(req, fetchAction, fetchRoute, handler) {
  //
  //  Destructure Parameters
  //
  const { sqlClient, sqlAction, sqlString, sqlTable, sqlWhere, sqlOrderByRaw, sqlRow, sqlKeyName } =
    req.body
  //
  //  Timestamp and Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter = logCounter + 1
  //
  //  Format Message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp}`
  if (sqlTable) logMessage = logMessage + ` Table(${sqlTable})`
  logMessage =
    logMessage +
    ` Handler(${handler}) Client(${sqlClient}) Action(${fetchAction}) Route(${fetchRoute}) Sql(${sqlAction})`

  if (sqlString) logMessage = logMessage + ` String(${sqlString})`
  if (sqlWhere) logMessage = logMessage + ` Where(${sqlWhere})`
  if (sqlOrderByRaw) logMessage = logMessage + ` OrderByRaw(${sqlOrderByRaw})`
  if (sqlRow) logMessage = logMessage + ` Row(Data)`
  if (sqlKeyName) logMessage = logMessage + ` KeyName(${sqlKeyName})`

  console.log(logMessage)
}
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawSignIn(req, fetchAction) {
  //
  //  Destructure Parameters
  //
  const { email, name, sqlClient } = req.body
  const { id } = req.params
  //
  //  Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter = logCounter + 1
  //
  // Format message & Log
  //
  let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} sqlClient(${sqlClient}) fetchAction(${fetchAction}) Email(${email}) `
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
