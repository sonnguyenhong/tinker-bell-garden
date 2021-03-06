const path = require('path')
const express = require('express')
const morgan = require('morgan')
const route = require('./routes/index')
const fileUpload = require('express-fileupload')
const { engine } = require('express-handlebars')
const multer = require('multer')

// const route = require('./routes/index')
const db = require('./config/db/index')
const app = express()
const port = 3000

// cookie bodyparser

const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))


// Connect to db
db.connect()

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//             // cb(null, path.join(__dirname, 'public', 'img'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

app.use(express.static(path.join(__dirname, 'public')))

app.use(fileUpload())

app.use(express.urlencoded())
    // app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
    // app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        _toInt: (str) => parseInt(str, 10),
        _mul: (a, b) => a * b,
        sum: (a, b) => a + b,
        sub: (a, b) => a - b,
        toString2: (a) => {
            return String(a.getDate()).padStart(2, '0') + '-' + String((a.getMonth() + 1)).padStart(2, '0') + '-' + a.getFullYear()
        },
        toString: (a) => {
            return a.getFullYear() + '-' + String((a.getMonth() + 1)).padStart(2, '0') + '-' + String(a.getDate()).padStart(2, '0')
        },
        checkTicketType: (type) => {
            if (type === 0) return true
            return false
        },
        helper: {
            sum: (a, b) => a + b,
        }
    },
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// console.log(path.join(__dirname, 'resources', 'views'))

route(app)

app.use((error, req, res, next) => {
    res.render('error/500')
})

app.listen(port, () => {
    console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})