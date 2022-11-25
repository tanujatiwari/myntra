const express = require('express')
const app = express()

app.use(express.json())

const routes = require('./routes')
const error = require('./middlewares/errorHandling')

app.use('/', routes);

app.use(error.errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})