import 'express-async-errors'
import express, { request, response, nextFunction} from 'express'
import routes from './app/routes/routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(routes)
app.use(cors())

app.use((error, req, res, next) => {
    console.log(error)

    return res.status(500).json({
        error: true,
        message: error.message
    })
})


export default app