//
//  Libraries
//
const express = require('express')
const cors = require('cors')
const knex = require('knex')
const { format } = require('date-fns')
//
//  Sub components
//
const serverRaw = require('./controllers/serverRaw')
const serverRegister = require('./controllers/serverRegister')
const serverSignin = require('./controllers/serverSignin')
const serverTest = require('./controllers/serverTest')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const quizserver = 'serverRemote20N'
//
// Constants
//
const {
  R20E_KNEX_PORT,
  R20E_KNEX_CLIENT,
  R20E_KNEX_HOST,
  R20E_KNEX_USER,
  R20E_KNEX_PWD,
  R20E_KNEX_DATABASE,
  R20E_PORT,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER,
  URL_TEST
} = require('./constants.js')
//
// Knex
//
const db = knex({
  client: R20E_KNEX_CLIENT,
  connection: {
    host: R20E_KNEX_HOST,
    port: R20E_KNEX_PORT,
    user: R20E_KNEX_USER,
    password: R20E_KNEX_PWD,
    database: R20E_KNEX_DATABASE
  }
})
//
//  Connection log
//
console.log(
  `Database Connection==> Client(${R20E_KNEX_CLIENT}) host(${R20E_KNEX_HOST}) port(${R20E_KNEX_PORT}) user(${R20E_KNEX_USER}) database(${R20E_KNEX_DATABASE})`
)
//
// Express
//
const app = express()
app.use(express.json())
//
//  CORS Middleware
//
app.use(
  cors({
    allowHeaders: '*',
    allowMethods: '*',
    origin: '*'
  })
)
//.............................................................................
//.  Routes - Test
//.............................................................................
app.post(URL_TEST, (req, res) => {
  logRawTables(req, 'POST', 'TEST', 'serverTest')
  serverTest.serverTest(req, res, logCounter)
})
//.............................................................................
//.  Routes - Tables
//.............................................................................
app.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})

app.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
app.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})

app.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  serverRegister.serverRegister(req, res, db, logCounter)
})
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} QuizServer(${quizserver}) running on PORT(${R20E_PORT})`
app.listen(R20E_PORT, () => {
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
