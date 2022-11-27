const express = require('express')
const app = express()
const cron = require('./cron')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./routes')
const error = require('./middlewares/errorHandling')

app.use('/', routes);

app.use(error.errorHandler)

cron.start();

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})