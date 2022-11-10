//!==================================================================================
//! Run Test SQL
//!==================================================================================
//
// Constants
//
const debugLog = true
const reference = 'serverTestHandler'
//
//  Global Variable - Define return object
//
const CatchFunction = 'serverTestHandler'
const SqlFunction = 'serverTestHandler'
var returnObject = {
  returnValue: '',
  returnMessage: '',
  returnSqlFunction: '',
  returnCatchFunction: '',
  returnCatch: false,
  returnCatchMsg: '',
  returnRows: []
}
//==================================================================================
//= Main  Function
//==================================================================================
function serverTestHandler(bodyParms) {
  try {
    //
    // Initialise Global Variables
    //
    returnObject.returnValue = false
    returnObject.returnMessage = ''
    returnObject.returnSqlFunction = SqlFunction
    returnObject.returnCatchFunction = ''
    returnObject.returnCatch = ''
    returnObject.returnCatchMsg = ''
    returnObject.returnRows = []
    //..................................................................................
    //. Parameter Validation
    //..................................................................................
    //
    //  Destructure Parameters
    //
    const { sqlAction, sqlString, sqlTable, sqlRow } = bodyParms
    if (debugLog) console.log(`${reference} - sqlAction ${sqlAction} sqlRow ${sqlRow}`)
    if (debugLog) console.log(reference, 'bodyParms ', bodyParms)
    //
    // Check values sent
    //
    if (!sqlAction) {
      returnObject.returnValue = false
      returnObject.returnMessage = `SqlAction parameter not passed`
      return returnObject
    }
    //
    //  Validate sqlAction type
    //
    if (
      sqlAction !== 'TEST' &&
      sqlAction !== 'DELETE' &&
      sqlAction !== 'EXIST' &&
      sqlAction !== 'SELECTSQL' &&
      sqlAction !== 'SELECT' &&
      sqlAction !== 'INSERT' &&
      sqlAction !== 'UPDATE' &&
      sqlAction !== 'UPSERT'
    ) {
      returnObject.returnValue = false
      returnObject.returnMessage = `SqlAction ${sqlAction}: SqlAction not valid`
      return returnObject
    }
    //
    //  SELECTSQL needs sqlString
    //
    if (sqlAction === 'SELECTSQL' && !sqlString) {
      returnObject.returnValue = false
      returnObject.returnMessage = `SqlAction ${sqlAction}: sqlString not passed`
      return returnObject
    }
    //
    //  not SELECTSQL needs table
    //
    if (sqlAction !== 'SELECTSQL' && !sqlTable) {
      returnObject.returnValue = false
      returnObject.returnMessage = `SqlAction ${sqlAction}: sqlTable not passed`
      return returnObject
    }
    //
    // Get Database record
    //
    const responseSql = [{ g3id: 'Richard', g3title: 'Richard' }]
    if (debugLog) console.log(reference, 'responseSql ', responseSql)
    //
    // Update Return Values
    //
    if (responseSql[0]) {
      returnObject.returnValue = true
      returnObject.returnMessage = `SqlAction ${sqlAction}: SUCCESS`
      returnObject.returnRows = responseSql
    } else {
      returnObject.returnValue = false
      returnObject.returnMessage = `SqlAction ${sqlAction}: FAILED`
      returnObject.returnRows = responseSql
    }
    if (debugLog) console.log(reference, 'returnObject ', returnObject)
    return returnObject
    //
    // Errors
    //
  } catch (err) {
    console.log(err.message)
    returnObject.returnCatch = true
    returnObject.returnCatchMsg = err.message
    returnObject.returnCatchFunction = CatchFunction
    if (debugLog) console.log(reference, 'returnObject ', returnObject)
    return returnObject
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverTestHandler
}
