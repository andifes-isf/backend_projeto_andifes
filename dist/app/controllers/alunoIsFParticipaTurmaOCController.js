"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisfparticipaturmaoc = require('../models/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _proeficienciaalunoisf = require('../models/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../models/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../models/curso'); var _curso2 = _interopRequireDefault(_curso);

// Classe auxiliar
var _nivelFactory = require('../utils/factories/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(404).json({
                    error: 'Acesso negado'
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
                },
                order: [
                    ['nivel', 'DESC']
                ],
                limit: 1
            })

            const nivelProeficiencia = _nivelFactory2.default.createInstanceOfNivel(curso.idioma)
            const diferencaEntreNivel = nivelProeficiencia.distanciaEntreNiveis(proeficienciaAluno ? proeficienciaAluno.nivel : 'nenhum', curso.nivel)
            if(diferencaEntreNivel < -1) {
                return res.status(422).json({
                    msg: `${req.loginUsuario} possui proeficiencia muito abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }

            return res.status(201).json("asdfasdf")

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }    
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()