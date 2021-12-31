const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const multer = require('multer')

const route = require('./routes/index')
const db = require('./config/db/index')
const app = express()
const port = 3000

// Connect to db
db.connect()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
            // cb(null, path.join(__dirname, 'public', 'img'))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        _toInt: (str) => parseInt(str, 10),
        _mul: (a, b) => a * b
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// console.log(path.join(__dirname, 'resources', 'views'))

// Route init
route(app)

app.listen(port, () => {
    console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})