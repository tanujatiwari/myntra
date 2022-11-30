const express = require('express')
const app = express()
const { deleteOtps, deleteExpiredTokens } = require('./cron')
const cors = require("cors");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./routes')
const error = require('./middlewares/errorHandling')

app.use('/', routes);

app.use(error.errorHandler)

deleteOtps.start();
deleteExpiredTokens.start();

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})