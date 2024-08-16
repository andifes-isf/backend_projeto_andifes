"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

// Models
var _usuario = require('../app/models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _alunoisf = require('../app/models/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _professorisf = require('../app/models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _alunodeinstituicao = require('../app/models/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);
var _instituicaoensino = require('../app/models/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _comprovantealunoinstituicao = require('../app/models/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);
var _curso = require('../app/models/curso'); var _curso2 = _interopRequireDefault(_curso);
var _turmaoc = require('../app/models/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _professorisfministraturmaoc = require('../app/models/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);
var _alunoisfparticipaturmaoc = require('../app/models/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _comprovanteprofessorinstituicao = require('../app/models/comprovanteprofessorinstituicao'); var _comprovanteprofessorinstituicao2 = _interopRequireDefault(_comprovanteprofessorinstituicao);

var _proeficienciaalunoisf = require('../app/models/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _proeficienciaprofessorisf = require('../app/models/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _alunoestrangeiro = require('../app/models/alunoestrangeiro'); var _alunoestrangeiro2 = _interopRequireDefault(_alunoestrangeiro);
var _instituicaoensinobrasileira = require('../app/models/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);
var _instituicaoensinoestrangeira = require('../app/models/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);

// buffer
const models = [_usuario2.default,
    _alunoisf2.default,
    _alunodeinstituicao2.default,
    _instituicaoensino2.default, 
    _instituicaoensinobrasileira2.default,
    _instituicaoensinoestrangeira2.default,
    _comprovantealunoinstituicao2.default,
    _professorisf2.default,
    _curso2.default,
    _turmaoc2.default,
    _professorisfministraturmaoc2.default,
    _alunoisfparticipaturmaoc2.default,
    _comprovanteprofessorinstituicao2.default,
    _proeficienciaalunoisf2.default,
    _proeficienciaprofessorisf2.default,
    _alunoestrangeiro2.default
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