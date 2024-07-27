import express from 'express'
import routes from './routes'
import './database'

class App {
    constructor() {
        this.server = express()
        this.middleware()
        this.routes()
    }

    middleware() {

        // utilizado para entender quando o corpo de requisição for json

        this.server.use(express.json())
    }

    routes() {
        // utilizado para aplicar as rotas

        this.server.use(routes)
    }
}

export default new App().server