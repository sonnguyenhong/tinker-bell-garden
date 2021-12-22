const path = require('path')
const express = require('express')
const morgan = require('morgan')
const route=require('./routes')
const fileUpload=require('express-fileupload')
const { engine } = require('express-handlebars')
const db = require('./config/db/index')
const app = express()
const port = 3000

// Connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())
// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers : {
        sum: (a,b) => a+b,
        toDateString: (a)=> Date(a),
        toString: (a)=>{
            return a.getFullYear()+'-'+(a.getMonth()+1)+'-'+ String(a.getDate()).padStart(2,'0')
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

console.log(path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
    console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})

