import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

// Models
import Usuario from '../app/models/usuario'
import AlunoIsF from '../app/models/alunoisf'
import ProfessorIsF from '../app/models/professorisf'
import AlunoDeInstituicao from '../app/models/alunodeinstituicao'
import InstituicaoEnsino from '../app/models/instituicaoensino'
import ComprovanteAlunoInstituicao from '../app/models/comprovantealunoinstituicao'
import Curso from '../app/models/curso'
import TurmaOC from '../app/models/turmaoc'
import ProfessorIsFMinistraTurmaOC from '../app/models/professorisfministraturmaoc'
import AlunoIsFParticipaTurmaOC from '../app/models/alunoisfparticipaturmaoc'
import ComprovanteProfessorInstituicao from '../app/models/comprovanteprofessorinstituicao'
import ComprovanteProfessorInstituicao from '../app/models/comprovanteprofessorinstituicao'
import ProeficienciaAlunoIsf from '../app/models/proeficienciaalunoisf'
import ProeficienciaProfessorIsf from '../app/models/proeficienciaprofessorisf'
import AlunoEstrangeiro from '../app/models/alunoestrangeiro'
import InstituicaoEnsinoBrasileira from '../app/models/instituicaoensinobrasileira'


// buffer
const models = [Usuario,
    AlunoIsF,
    AlunoDeInstituicao,
    InstituicaoEnsino, 
    InstituicaoEnsinoBrasileira,
    ComprovanteAlunoInstituicao,
    ProfessorIsF,
    Curso,
    TurmaOC,
    ProfessorIsFMinistraTurmaOC,
    AlunoIsFParticipaTurmaOC,
    ComprovanteProfessorInstituicao,
    ProeficienciaAlunoIsf,
    ProeficienciaProfessorIsf,
    AlunoEstrangeiro
]

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