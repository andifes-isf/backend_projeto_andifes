"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

//// Models

// curso_especializacao
var _alteracaoturmaespecializacao = require('../app/models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);
var _cursistacursaturmaespecializacao = require('../app/models/curso_especializacao/cursistacursaturmaespecializacao'); var _cursistacursaturmaespecializacao2 = _interopRequireDefault(_cursistacursaturmaespecializacao);
var _disciplinaespecializacao = require('../app/models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);
var _editalcursoespecializacao = require('../app/models/curso_especializacao/editalcursoespecializacao'); var _editalcursoespecializacao2 = _interopRequireDefault(_editalcursoespecializacao);
var _InteresseNaDisciplina = require('../app/models/curso_especializacao/InteresseNaDisciplina'); var _InteresseNaDisciplina2 = _interopRequireDefault(_InteresseNaDisciplina);
var _relatorio_pratico = require('../app/models/curso_especializacao/relatorio_pratico'); var _relatorio_pratico2 = _interopRequireDefault(_relatorio_pratico);
var _ministranteMinistraTurmaEspecializacao = require('../app/models/curso_especializacao/ministranteMinistraTurmaEspecializacao'); var _ministranteMinistraTurmaEspecializacao2 = _interopRequireDefault(_ministranteMinistraTurmaEspecializacao);
var _OrientadorOrientaCursista = require('../app/models/curso_especializacao/OrientadorOrientaCursista'); var _OrientadorOrientaCursista2 = _interopRequireDefault(_OrientadorOrientaCursista);
var _turmadisciplinaespecializacao = require('../app/models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);

// instituicao
var _instituicaoensinobrasileira = require('../app/models/instituicao/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);
var _instituicaoensinoestrangeira = require('../app/models/instituicao/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);
var _instituicaoensino = require('../app/models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);

// ofertacoletiva
var _alunoisfparticipaturmaoc = require('../app/models/ofertacoletiva/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _curso = require('../app/models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);
var _professorisfministraturmaoc = require('../app/models/ofertacoletiva/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);
var _turmaoc = require('../app/models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);

// proeficiencia
var _proeficienciaalunoisf = require('../app/models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _proeficienciaprofessorisf = require('../app/models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);

// usuario_pertence_instituicao
var _comprovantealunoinstituicao = require('../app/models/usuario_pertence_instituicao/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);
var _comprovanteprofessorinstituicao = require('../app/models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'); var _comprovanteprofessorinstituicao2 = _interopRequireDefault(_comprovanteprofessorinstituicao);

// usuarios
var _alunodeinstituicao = require('../app/models/usuarios/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);
var _alunoestrangeiro = require('../app/models/usuarios/alunoestrangeiro'); var _alunoestrangeiro2 = _interopRequireDefault(_alunoestrangeiro);
var _alunograduacao = require('../app/models/usuarios/alunograduacao'); var _alunograduacao2 = _interopRequireDefault(_alunograduacao);
var _alunoisf = require('../app/models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _coordenadornacional = require('../app/models/usuarios/coordenadornacional'); var _coordenadornacional2 = _interopRequireDefault(_coordenadornacional);
var _coordenadornacionalIdioma = require('../app/models/usuarios/coordenadornacionalIdioma'); var _coordenadornacionalIdioma2 = _interopRequireDefault(_coordenadornacionalIdioma);
var _cursistaespecializacao = require('../app/models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _docenteministrante = require('../app/models/usuarios/docenteministrante'); var _docenteministrante2 = _interopRequireDefault(_docenteministrante);
var _docenteorientador = require('../app/models/usuarios/docenteorientador'); var _docenteorientador2 = _interopRequireDefault(_docenteorientador);
var _professorisf = require('../app/models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../app/models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Utils
var _notificacao = require('../app/models/utils/notificacao'); var _notificacao2 = _interopRequireDefault(_notificacao);

// buffer
const models = [
    // curso_especializacao
    _alteracaoturmaespecializacao2.default,
    _cursistacursaturmaespecializacao2.default,
    _disciplinaespecializacao2.default,
    _editalcursoespecializacao2.default,
    _InteresseNaDisciplina2.default,
    _ministranteMinistraTurmaEspecializacao2.default,
    _OrientadorOrientaCursista2.default,
    _relatorio_pratico2.default,
    _turmadisciplinaespecializacao2.default,

    // instituicao
    _instituicaoensino2.default, 
    _instituicaoensinobrasileira2.default,
    _instituicaoensinoestrangeira2.default,
    
    // ofertacoletiva
    _curso2.default,
    _turmaoc2.default,
    _professorisfministraturmaoc2.default,
    _alunoisfparticipaturmaoc2.default,
    
    // proficiencia
    _proeficienciaalunoisf2.default,
    _proeficienciaprofessorisf2.default,

    // usuario_pertence_instituicao
    _comprovantealunoinstituicao2.default,
    _comprovanteprofessorinstituicao2.default,

    // usuarios
    _alunodeinstituicao2.default,
    _alunoestrangeiro2.default,
    _alunograduacao2.default,
    _alunoisf2.default,
    _coordenadornacionalIdioma2.default,
    _coordenadornacional2.default,
    _cursistaespecializacao2.default,
    _docenteministrante2.default,
    _docenteorientador2.default,
    _professorisf2.default,
    _usuario2.default,

    // Utils
    _notificacao2.default

]

class DataBase{
    constructor() {
        this.init()
    }

    init() {
        // Inicializa a conexão
        this.connection = new (0, _sequelize2.default)(_database2.default)

        // Percorre o vetor e acessa o método inicializador
        models.map(model => model.init(this.connection))
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

exports. default = new DataBase()