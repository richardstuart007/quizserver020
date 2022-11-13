//
//  Database (Railway) -----not created yet !! - only version 010
//
exports.REMOTE1_KNEX_CLIENT = 'pg'
exports.REMOTE1_KNEX_PORT = 6436
exports.REMOTE1_KNEX_HOST = 'containers-us-west-71.railway.app'
exports.REMOTE1_KNEX_USER = 'postgres'
exports.REMOTE1_KNEX_PWD = 'cfMC0QKSa86EIbpBdqfk'
exports.REMOTE1_KNEX_DATABASE = 'railway'
exports.REMOTE1_URL_PORT = 21111
//
//  Database (ElephantSQL)
//
exports.REMOTE2_KNEX_CLIENT = 'pg'
exports.REMOTE2_KNEX_PORT = 5432
exports.REMOTE2_KNEX_HOST = 'rosie.db.elephantsql.com'
exports.REMOTE2_KNEX_USER = 'wdscnzxj'
exports.REMOTE2_KNEX_PWD = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.REMOTE2_KNEX_DATABASE = 'wdscnzxj'
exports.REMOTE2_URL_PORT = 21121
//
//  Database (Local)
//
exports.LOCAL_KNEX_CLIENT = 'pg'
exports.LOCAL_KNEX_HOST = '127.0.0.1'
exports.LOCAL_KNEX_USER = 'richa'
exports.LOCAL_KNEX_PWD = 'london'
exports.LOCAL_KNEX_DATABASE = 'Quiz020'
exports.LOCAL_URL_PORT = 20001
//
//  URL
//
exports.URL_TABLES = '/QuizTables'
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
exports.URL_TEST = '/QuizTest'
//
//  corsWhitelist
//
exports.CORS_WHITELIST = [
  'https://app.netlify.com',
  'https://richardstuart007.github.io/',
  'https://quizclient010-production.up.railway.app/'
]
