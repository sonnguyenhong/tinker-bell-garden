const auth = require('./middlewares/auth')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const db = require('./config/db/index')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const router = require('./routes')
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
// Connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

console.log(path.join(__dirname, 'resources', 'views'))
router(app)
app.get('/',auth.requireAuth ,(req, res, next) => {
    res.render('banhang/trangchu')
})

app.listen(port, () => {
    console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})