"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _disciplinaespecializacao = require('../../models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _alteracaoturmaespecializacao = require('../../models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);
var _ministranteMinistraTurmaEspecializacao = require('../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'); var _ministranteMinistraTurmaEspecializacao2 = _interopRequireDefault(_ministranteMinistraTurmaEspecializacao);
var _docenteministrante = require('../../models/usuarios/docenteministrante'); var _docenteministrante2 = _interopRequireDefault(_docenteministrante);

// Utils
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class turmaDisciplinaEspecializacaoController {
    
    static async validateData(className, disciplineName, ministerLogin) {
        const existingClass = await _turmadisciplinaespecializacao2.default.findOne({
            where: {
                nome: className,
            }
        })

        const existingDiscipline = await _disciplinaespecializacao2.default.findOne({
            where: {
                nome: disciplineName
            }
        })

        const existingMinister = await _docenteministrante2.default.findOne({
            where: {
                login: ministerLogin
            }
        })

        return [
            existingClass !== null,
            existingDiscipline !== null,
            existingMinister !== null
        ]
    }

    async post(req, res){
        const className = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

        const [existingClass, existingDiscipline, existingMinister] = await turmaDisciplinaEspecializacaoController.validateData(className, req.body.disciplina, req.body.loginMinistrante)
        
        if(existingClass) {
            throw new (0, _CustomError2.default)(`${className} ` + _messages_pt2.default.ALREADY_IN_SYSTEM, _httpStatus2.default.BAD_REQUEST)
        }

        if(!existingDiscipline || !existingMinister) {
            throw new (0, _CustomError2.default)(`${req.body.loginMinistrante} ou ${req.body.disciplina} ` + _messages_pt2.default.NOT_FOUND, _httpStatus2.default.BAD_REQUEST)
        }
        
        const classObject = await _turmadisciplinaespecializacao2.default.create({
            disciplina: req.body.disciplina,
            edital: req.body.edital,
            nome: req.body.nome,
            mesOferta: req.body.mesOferta,
            numeroVagas: req.body.numeroVagas,
            numeroMinimoAlunos: req.body.numeroMinimoAlunos,
            numeroInscritos: req.body.numeroInscritos,
            numeroAprovados: req.body.numeroAprovados,
            numeroDesistentes: req.body.numeroDesistentes,
            numeroReprovados: req.body.numeroReprovados,
        })	

        const MinistersClass = await _ministranteMinistraTurmaEspecializacao2.default.create({
            nomeTurma: classObject.nome,
            login: req.body.loginMinistrante
        })
        
        return res.status(_httpStatus2.default.CREATED).json({
            turma: classObject,
            relacao: MinistersClass
        })
    }
    
    async get(_, res) {
        const classes = await _turmadisciplinaespecializacao2.default.findAll({
            order: [
                ['edital', 'DESC']
            ]
        })
        
        return res.status(_httpStatus2.default.SUCCESS).json(classes)
    }

    async getPorAno(req, res) {
        const classes = await _turmadisciplinaespecializacao2.default.findAll({
            where: {
                edital: req.params.ano
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        
        return res.status(_httpStatus2.default.SUCCESS).json(classes)
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()