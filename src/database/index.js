import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

// Models
import Usuario from '../app/models/usuario'
import AlunoIsF from '../app/models/alunoisf'
import ProfessorIsF from '../app/models/professorisf'
import AlunoDeInstituicao from '../app/models/alunodeinstituicao'
import InstituicaoEnsino from '../app/models/instituicaoensino'
import ComprovanteAlunoInstituicao from '../app/models/comprovantealunoinstituicao'

// buffer
const models = [Usuario, AlunoIsF, AlunoDeInstituicao, InstituicaoEnsino, ComprovanteAlunoInstituicao, ProfessorIsF]

class DataBase{
    constructor() {
        this.init()
    }

    init() {
        // Inicializa a conexão
        this.connection = new Sequelize(DatabaseConfig)

        // Percorre o vetor e acessa o método inicializador
        models.map(model => model.init(this.connection))
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new DataBase()