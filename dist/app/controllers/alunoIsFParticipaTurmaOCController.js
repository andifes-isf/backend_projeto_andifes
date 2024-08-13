"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _alunoisfparticipaturmaoc = require('../models/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _proeficienciaalunoisf = require('../models/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../models/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../models/curso'); var _curso2 = _interopRequireDefault(_curso);

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        if(!(req.tipoUsuario === 'alunoisf')){
            return res.status(404).json({
                error: 'Pagina nao encontrada'
            })
        }

        const turma = await _turmaoc2.default.findOne({
            where: {
                idTurma: req.body.idTurma
            }
        })

        const curso = await _curso2.default.findOne({
            where: {
                idCurso: turma.idCurso
            }
        })
        
        const proeficienciaAluno = await _proeficienciaalunoisf2.default.findOne({
            where: {
                login: req.loginUsuario,
                idioma: curso.idioma
            }
        })

        console.log(proeficienciaAluno.nivel)

        if(curso.idioma === 'japones') {
            if(proeficienciaAluno == null) {
                if(!(curso.nivel === "n5")) {
                    return res.status(422).json({
                        msg: `Esse curso é de nivel ${curso.nivel}. Para começar a aprender ${curso.idioma}, é preciso começar pelo nivel N5`
                    })
                }
            }
            if(curso.nivel < proeficienciaAluno.nivel){
                return res.status(422).json({
                    msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaAluno.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }
        } else {
            if(proeficienciaAluno == null) {
                if(!(curso.nivel === "A1")) {
                    return res.status(422).json({
                        msg: `Esse curso é de nivel ${curso.nivel}. Para começar a aprender ${curso.idioma}, é preciso começar pelo nivel A1`
                    })
                }
            }
            if(curso.nivel > proeficienciaAluno.nivel){
                return res.status(422).json({
                    msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaAluno.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }
        }


        try {
            const relacao = await _alunoisfparticipaturmaoc2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })
            
            if(relacao) {
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            const comprovante = await _alunoisfparticipaturmaoc2.default.create({
                idTurma: req.body.idTurma,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()