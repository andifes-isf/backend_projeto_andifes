"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _alteracaoturmaespecializacao = require('../../models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);
var _ministranteMinistraTurmaEspecializacao = require('../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'); var _ministranteMinistraTurmaEspecializacao2 = _interopRequireDefault(_ministranteMinistraTurmaEspecializacao);

class turmaDisciplinaEspecializacaoController {
    
    async post(req, res){
        try {

            const nomeTurma = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

            const turmaExistente = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: nomeTurma,
                }
            })
            
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma ja cadastrada no sistema"
                })
            }
            
            const turma = await _turmadisciplinaespecializacao2.default.create({
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

            const relacaoComTurma = await _ministranteMinistraTurmaEspecializacao2.default.create({
                nomeTurma: turma.nome,
                login: req.body.loginMinistrante
            })
            
            return res.status(201).json({
                turma: turma,
                relacao: relacaoComTurma
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
    
    async get(_, res) {
        try {
            const turmas = await _turmadisciplinaespecializacao2.default.findAll({
                order: [
                    ['edital', 'DESC']
                ]
            })
            
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getPorAno(req, res) {
        try {
            const turmas = await _turmadisciplinaespecializacao2.default.findAll({
                where: {
                    edital: req.params.ano
                },
                order: [
                    ['nome', 'ASC']
                ]
            })
            
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()