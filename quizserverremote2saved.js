//
//  Libraries
//
const express = require('express')
const knex = require('knex')
const cors = require('cors')
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
const quizserver = 'quizServerRemote2'
//
// Constants
//
const {
  REMOTE2_KNEX_PORT,
  REMOTE2_KNEX_CLIENT,
  REMOTE2_KNEX_HOST,
  REMOTE2_KNEX_USER,
  REMOTE2_KNEX_PWD,
  REMOTE2_KNEX_DATABASE,
  REMOTE2_URL_PORT,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER,
  URL_TEST
} = require('./quizServerConstants.js')
//
// Knex
//
const db = knex({
  client: REMOTE2_KNEX_CLIENT,
  connection: {
    host: REMOTE2_KNEX_HOST,
    port: REMOTE2_KNEX_PORT,
    user: REMOTE2_KNEX_USER,
    password: REMOTE2_KNEX_PWD,
    database: REMOTE2_KNEX_DATABASE
  }
})
//
//  Connection log
//
console.log(
  `Database Connection==> Client(${REMOTE2_KNEX_CLIENT}) host(${REMOTE2_KNEX_HOST}) port(${REMOTE2_KNEX_PORT}) user(${REMOTE2_KNEX_USER}) database(${REMOTE2_KNEX_DATABASE})`
)
//
// Express
//
const app = express()
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
// app.use((req, res, next) => {
//   const corsWhitelist = CORS_WHITELIST
//   if (corsWhitelist.includes(req.headers.origin) || true === true) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     res.header('Access-Control-Allow-Methods', 'POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Credentials', true)
//   }
//   next()
// })
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
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} QuizServer(${quizserver}) running on PORT(${REMOTE2_URL_PORT})`
app.listen(REMOTE2_URL_PORT, () => {
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
