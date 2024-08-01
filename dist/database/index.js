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

// buffer
const models = [_usuario2.default, _alunoisf2.default, _alunodeinstituicao2.default, _instituicaoensino2.default, _comprovantealunoinstituicao2.default, _professorisf2.default, _curso2.default, _turmaoc2.default, _professorisfministraturmaoc2.default]

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