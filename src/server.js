// import App from "./app"
// import ManagerCron from "./cron/ManagerCron"

// App.listen(8800, () => {
//     ManagerCron.run()
// })

import 'express-async-errors'
import express, { request, response, nextFunction} from 'express'
import routes from './app/routes/routes'
import './database'

const app = express()

app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(500).json(error.message)
})


app.listen(8800)