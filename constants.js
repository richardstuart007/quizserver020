//---------------------------------------------------------------------
//-  Database 10
//---------------------------------------------------------------------
//
//  Database (Local 10)
//
exports.L10_KNEX_CLIENT = 'pg'
exports.L10_KNEX_HOST = 'localhost'
exports.L10_KNEX_USER = 'richa'
exports.L10_KNEX_PWD = 'london'
exports.L10_KNEX_DATABASE = 'Quiz010'
//
//  Database (Railway 10)
//
exports.R10_KNEX_CLIENT = 'pg'
exports.R10_KNEX_PORT = 6436
exports.R10_KNEX_HOST = 'containers-us-west-71.railway.app'
exports.R10_KNEX_USER = 'postgres'
exports.R10_KNEX_PWD = 'cfMC0QKSa86EIbpBdqfk'
exports.R10_KNEX_DATABASE = 'railway'
//
//  Database (Railway 20)
//
exports.R20R_KNEX_CLIENT = 'pg'
exports.R20R_KNEX_PORT = 7306
exports.R20R_KNEX_HOST = 'containers-us-west-117.railway.app'
exports.R20R_KNEX_USER = 'postgres'
exports.R20R_KNEX_PWD = 'xw85A7Dol3dpWGDOYdC1'
exports.R20R_KNEX_DATABASE = 'railway'
//---------------------------------------------------------------------
//-  Database 20
//---------------------------------------------------------------------
//
//  Database (Local 20)
//
exports.L20_KNEX_CLIENT = 'pg'
exports.L20_KNEX_HOST = 'localhost'
exports.L20_KNEX_USER = 'richa'
exports.L20_KNEX_PWD = 'london'
exports.L20_KNEX_DATABASE = 'Quiz020'
//
//  Database (ElephantSQL 20)
//
exports.R20E_KNEX_CLIENT = 'pg'
exports.R20E_KNEX_PORT = 5432
exports.R20E_KNEX_HOST = 'rosie.db.elephantsql.com'
exports.R20E_KNEX_USER = 'wdscnzxj'
exports.R20E_KNEX_PWD = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.R20E_KNEX_DATABASE = 'wdscnzxj'
//---------------------------------------------------------------------
//-  Routes
//---------------------------------------------------------------------
exports.URL_TABLES = '/QuizTables'
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
exports.URL_TEST = '/QuizTest'
//---------------------------------------------------------------------
//-  LOCAL Ports
//---------------------------------------------------------------------
//
//  Local Server --> Local Database
//
exports.L10_PORT = 51001
exports.L20_PORT = 51002
//
//  Local Server --> Remote Database 1/2/3
//
exports.LOC_R10_PORT = 51211
exports.LOC_R20E_PORT = 51212
exports.LOC_R20R_PORT = 51213
//
//  Remote Port
//
exports.R10_PORT = 51111
exports.R20E_PORT = 51112
exports.R20R_PORT = 51113
//---------------------------------------------------------------------
//  corsWhitelist
//---------------------------------------------------------------------
exports.CORS_WHITELIST = [
  'https://quizclient020.netlify.app',
  'https://quizclient020.netlify.app/',
  'https://richardstuart007.github.io',
  'https://quizclient010-production.up.railway.app'
]
