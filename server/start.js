'use strict'
const db = require('./db/index')
const app = require('./middleware')
const port = process.env.PORT || 5000

db.sync({})  // sync our database
.then(function(){
    app.listen(port) // then start listening with our express server once we have synced
    console.log('listening to 5000')
})
