// KM/SC -- Nice, clean start file!
'use strict'
const db = require('./db/index')
const app = require('./middleware')

db.sync({})  // sync our database
.then(function(){
    app.listen(5000) // then start listening with our express server once we have synced
    console.log('listening to 5000')
})
