import express from 'express';
import cors from 'cors';
import {Sequelize} from "sequelize";

require('dotenv').config()
const sequelize: Sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000
const hostname = process.env.HOSTNAME || "0.0.0.0"

const app = express()
const server = require('http').createServer(app)

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        server.listen(
            PORT, hostname, () => console.log(`Server is working on port: ${PORT}, hostname: ${hostname}`)
        )
    } catch (e) {
        console.log(e)
    }
}

start().then(r => console.log(r)).catch(r => console.log(r))
