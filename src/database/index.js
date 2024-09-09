import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

// Models
import Usuario from '../app/models/usuarios/usuario'
import AlunoIsF from '../app/models/usuarios/alunoisf'
import ProfessorIsF from '../app/models/usuarios/professorisf'
import AlunoDeInstituicao from '../app/models/usuarios/alunodeinstituicao'
import InstituicaoEnsino from '../app/models/instituicao/instituicaoensino'
import ComprovanteAlunoInstituicao from '../app/models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import Curso from '../app/models/ofertacoletiva/curso'
import TurmaOC from '../app/models/ofertacoletiva/turmaoc'
import ProfessorIsFMinistraTurmaOC from '../app/models/ofertacoletiva/professorisfministraturmaoc'
import AlunoIsFParticipaTurmaOC from '../app/models/ofertacoletiva/alunoisfparticipaturmaoc'
import ComprovanteProfessorInstituicao from '../app/models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'
import ComprovanteProfessorInstituicao from '../app/models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'
import ProeficienciaAlunoIsf from '../app/models/proeficiencia/proeficienciaalunoisf'
import ProeficienciaProfessorIsf from '../app/models/proeficiencia/proeficienciaprofessorisf'
import AlunoEstrangeiro from '../app/models/usuarios/alunoestrangeiro'
import InstituicaoEnsinoBrasileira from '../app/models/instituicao/instituicaoensinobrasileira'
import InstituicaoEnsinoEstrangeira from '../app/models/instituicao/instituicaoensinoestrangeira'
import CursistaEspecializacao from '../app/models/usuarios/cursistaespecializacao'
import AlunoGraduacao from '../app/models/usuarios/alunograduacao'

// buffer
const models = [Usuario,
    AlunoIsF,
    AlunoDeInstituicao,
    InstituicaoEnsino, 
    InstituicaoEnsinoBrasileira,
    InstituicaoEnsinoEstrangeira,
    ComprovanteAlunoInstituicao,
    ProfessorIsF,
    CursistaEspecializacao,
    AlunoGraduacao,
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