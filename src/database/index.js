import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

// Models
import Usuario from '../app/models/usuario'
import AlunoIsF from '../app/models/alunoisf'
import AlunoDeInstituicao from '../app/models/alunodeinstituicao'

// buffer
const models = [Usuario, AlunoIsF, AlunoDeInstituicao]

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