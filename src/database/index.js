import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

//// Models

// curso_especializacao
import DisciplinaEspecializacao from '../app/models/curso_especializacao/disciplinaespecializacao'
import TurmaDisciplinaEspecializacao from '../app/models/curso_especializacao/turmadisciplinaespecializacao'
import MaterialCursista from '../app/models/curso_especializacao/materialcursista'

// instituicao
import InstituicaoEnsinoBrasileira from '../app/models/instituicao/instituicaoensinobrasileira'
import InstituicaoEnsinoEstrangeira from '../app/models/instituicao/instituicaoensinoestrangeira'
import InstituicaoEnsino from '../app/models/instituicao/instituicaoensino'

// ofertacoletiva
import AlunoIsFParticipaTurmaOC from '../app/models/ofertacoletiva/alunoisfparticipaturmaoc'
import Curso from '../app/models/ofertacoletiva/curso'
import ProfessorIsFMinistraTurmaOC from '../app/models/ofertacoletiva/professorisfministraturmaoc'
import TurmaOC from '../app/models/ofertacoletiva/turmaoc'

// proeficiencia
import ProeficienciaAlunoIsf from '../app/models/proeficiencia/proeficienciaalunoisf'
import ProeficienciaProfessorIsf from '../app/models/proeficiencia/proeficienciaprofessorisf'

// usuario_pertence_instituicao
import ComprovanteAlunoInstituicao from '../app/models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import ComprovanteProfessorInstituicao from '../app/models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'

// usuarios
import AlunoDeInstituicao from '../app/models/usuarios/alunodeinstituicao'
import AlunoEstrangeiro from '../app/models/usuarios/alunoestrangeiro'
import AlunoGraduacao from '../app/models/usuarios/alunograduacao'
import AlunoIsF from '../app/models/usuarios/alunoisf'
import CoordenadorNacional from '../app/models/usuarios/coordenadornacional'
import CoordenadorNacionalIdioma from '../app/models/usuarios/coordenadornacionalIdioma'
import CursistaEspecializacao from '../app/models/usuarios/cursistaespecializacao'
import DocenteOrientador from '../app/models/usuarios/docenteorientador'
import ProfessorIsF from '../app/models/usuarios/professorisf'
import Usuario from '../app/models/usuarios/usuario'

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
    AlunoEstrangeiro,
    DisciplinaEspecializacao,
    TurmaDisciplinaEspecializacao,
    CoordenadorNacionalIdioma,
    MaterialCursista,
    CoordenadorNacional,
    DocenteOrientador
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