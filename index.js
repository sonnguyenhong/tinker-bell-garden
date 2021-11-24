const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('combined'))

app.get('/', (req, res, next) => {
    return res.send('Hello World')
})

app.listen(port, () => {
    console.log(`TinkerBellGarden is listening at http://localhost:${port}`)
})