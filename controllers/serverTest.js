//==================================================================================
//= Process a TEST dummy fetch request from server route
//==================================================================================
const { format } = require('date-fns')
const serverTestHandler = require('./serverTestHandler')
//
// Constants
//
const debugLog = true
const reference = 'serverTest'
//
//  Global Variable - Define return object
//
const CatchFunction = 'serverTest'
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
//= Get a row from a table : table, keyName, keyValue are passed in Body
//==================================================================================
function serverTest(req, res, debugLogCounter) {
  //
  //  Time Stamp
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  let debugLogMessage = `Handler. ${debugLogCounter} Time:${TimeStamp}`

  try {
    //
    // Initialise Global Variables
    //
    returnObject.returnValue = false
    returnObject.returnMessage = ''
    returnObject.returnSqlFunction = ''
    returnObject.returnCatchFunction = ''
    returnObject.returnCatch = ''
    returnObject.returnCatchMsg = ''
    returnObject.returnRows = []
    //..................................................................................
    //. Check values sent in Body
    //..................................................................................
    const bodyParms = req.body
    //
    //  Action type not sent
    //
    const { sqlAction, sqlTable } = bodyParms
    //
    //  Table/Action to message
    //
    debugLogMessage = debugLogMessage + ` Table(${sqlTable}) ${sqlAction}`
    //
    //  Check Action passed
    //
    if (!sqlAction) {
      returnObject.returnMessage = `sqlAction not sent as Body Parameters`
      returnObject.returnCatchFunction = CatchFunction
      if (debugLog) console.log(reference, 'returnObject ', returnObject)
      return res.status(400).json(returnObject)
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
      returnObject.returnMessage = `sqlAction ${sqlAction}: sqlAction not valid`
      if (debugLog) console.log(reference, 'returnObject ', returnObject)
      return res.status(400).json(returnObject)
    }
    //
    // Process Request
    //
    const returnData = serverTestHandler.serverTestHandler(bodyParms)
    if (debugLog) console.log(reference, 'returnData ', returnData)
    //
    // Parse Results
    //
    const returnDataObject = returnData
    if (debugLog) console.log(reference, 'returnDataObject ', returnDataObject)
    returnObject = Object.assign({}, returnObject, returnDataObject)
    if (debugLog) console.log(reference, 'returnObject ', returnObject)
    //
    //  Return values
    //
    if (debugLog) console.log(`HANDLER. ${debugLogCounter} Time:${TimeStamp} ${returnObject}`)

    const RowUpdate = returnObject.returnValue
    if (!RowUpdate) {
      if (debugLog)
        console.log(
          `HANDLER. ${debugLogCounter} Time:${TimeStamp} Module ${reference} received No Data`
        )
    }
    //
    //  debugLog return values
    //
    const records = Object.keys(returnObject.returnRows).length
    debugLogMessage = debugLogMessage + `(${records})`
    console.log(debugLogMessage)
    if (debugLog) console.log(reference, 'returnObject ', returnObject)
    return res.status(200).json(returnObject.returnRows)
    //
    // Errors
    //
  } catch (err) {
    debugLogMessage = debugLogMessage + ` Error(${err.message})`
    console.log(debugLogMessage)
    returnObject.returnCatch = true
    returnObject.returnCatchMsg = err.message
    returnObject.returnCatchFunction = CatchFunction
    if (debugLog) console.log(reference, 'returnObject ', returnObject)
    return res.status(400).send(returnObject)
  }
}

//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverTest
}
