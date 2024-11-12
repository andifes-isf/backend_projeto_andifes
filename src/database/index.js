import Sequelize from 'sequelize'
import DatabaseConfig from '../config/database'

//// Models

// curso_especializacao
import AlteracaoTurmaEspecializacao from '../app/models/curso_especializacao/alteracaoturmaespecializacao'
import CursistaCursaTurmaEspecializacao from '../app/models/curso_especializacao/cursistacursaturmaespecializacao'
import DisciplinaEspecializacao from '../app/models/curso_especializacao/disciplinaespecializacao'
import EditalCursoEspecializacao from '../app/models/curso_especializacao/editalcursoespecializacao'
import InteresseNaDisciplina from '../app/models/curso_especializacao/InteresseNaDisciplina'
import MinistranteMinistraTurmaEspecializacao from '../app/models/curso_especializacao/ministranteMinistraTurmaEspecializacao'
import OuvidoriaCursoEspecializacao from '../app/models/curso_especializacao/ouvidoria_curso_especializacao'
import OrientadorOrientaCursista from '../app/models/curso_especializacao/OrientadorOrientaCursista'
import RelatorioPratico from '../app/models/curso_especializacao/relatorio_pratico'
import TurmaDisciplinaEspecializacao from '../app/models/curso_especializacao/turmadisciplinaespecializacao'

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
import DocenteMinistrante from '../app/models/usuarios/docenteministrante'
import DocenteOrientador from '../app/models/usuarios/docenteorientador'
import ProfessorIsF from '../app/models/usuarios/professorisf'
import Usuario from '../app/models/usuarios/usuario'

// Utils
import Notificacao from '../app/models/utils/notificacao'

// buffer
const models = [
    // curso_especializacao
    AlteracaoTurmaEspecializacao,
    CursistaCursaTurmaEspecializacao,
    DisciplinaEspecializacao,
    EditalCursoEspecializacao,
    InteresseNaDisciplina,
    MinistranteMinistraTurmaEspecializacao,
    OuvidoriaCursoEspecializacao,
    OrientadorOrientaCursista,
    RelatorioPratico,
    TurmaDisciplinaEspecializacao,

    // instituicao
    InstituicaoEnsino, 
    InstituicaoEnsinoBrasileira,
    InstituicaoEnsinoEstrangeira,
    
    // ofertacoletiva
    Curso,
    TurmaOC,
    ProfessorIsFMinistraTurmaOC,
    AlunoIsFParticipaTurmaOC,
    
    // proficiencia
    ProeficienciaAlunoIsf,
    ProeficienciaProfessorIsf,

    // usuario_pertence_instituicao
    ComprovanteAlunoInstituicao,
    ComprovanteProfessorInstituicao,

    // usuarios
    AlunoDeInstituicao,
    AlunoEstrangeiro,
    AlunoGraduacao,
    AlunoIsF,
    CoordenadorNacionalIdioma,
    CoordenadorNacional,
    CursistaEspecializacao,
    DocenteMinistrante,
    DocenteOrientador,
    ProfessorIsF,
    Usuario,

    // Utils
    Notificacao

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