"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

var _disciplinaespecializacao = require('../../models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _alteracaoturmaespecializacao = require('../../models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);
var _ministranteMinistraTurmaEspecializacao = require('../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'); var _ministranteMinistraTurmaEspecializacao2 = _interopRequireDefault(_ministranteMinistraTurmaEspecializacao);
var _docenteministrante = require('../../models/usuarios/docenteministrante'); var _docenteministrante2 = _interopRequireDefault(_docenteministrante);

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
            existingDiscipline == null,
            existingMinister == null
        ]
    }

    async post(req, res){
        try {

            const className = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

            const [existingClass, existingDiscipline, existingMinister] = await turmaDisciplinaEspecializacaoController.validateData(className, req.body.disciplina, req.body.loginMinistrante)
            
            if(existingClass) {
                return res.status(409).json({
                    error: `${className} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }

            if(existingDiscipline || existingMinister) {
                return res.status(409).json({
                    error: `${req.body.loginMinistrante} ou ${req.body.disciplina} ` + _messages_pt2.default.NOT_FOUND
                })
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
            
            return res.status(201).json({
                turma: classObject,
                relacao: relacaoComTurma
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
    
    async get(_, res) {
        try {
            const classes = await _turmadisciplinaespecializacao2.default.findAll({
                order: [
                    ['edital', 'DESC']
                ]
            })
            
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getPorAno(req, res) {
        try {
            const classes = await _turmadisciplinaespecializacao2.default.findAll({
                where: {
                    edital: req.params.ano
                },
                order: [
                    ['nome', 'ASC']
                ]
            })
            
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()