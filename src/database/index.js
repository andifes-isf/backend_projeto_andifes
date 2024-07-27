import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

// Models
import User from '../app/models/usuario'

// buffer
const models = [User]

class DataBase{
    constructor() {
        this.init()
    }

    init() {
        // Inicializa a conexão
        this.connection = new Sequelize(DatabaseConfig)

        // Percorre o vetor e acessa o método inicializador
        models.map(model => model.init(this.connection))
    }
}

export default new DataBase()