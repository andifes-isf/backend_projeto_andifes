"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisfparticipaturmaoc = require('../../models/ofertacoletiva/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _proeficienciaalunoisf = require('../../models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Classe auxiliar
var _nivelFactory = require('../../utils/niveis/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);
var _nivel = require('../../utils/niveis/nivel'); var _nivel2 = _interopRequireDefault(_nivel);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_STUDENT)){
                return res.status(404).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }
    
            const studentInClass = await _alunoisfparticipaturmaoc2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })

            if(studentInClass){
                return res.status(409).json({
                    error: `${studentInClass.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }

            const turma = await _turmaoc2.default.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })

            if(!turma){
                return res.status(422).json({
                    error: `Turma ${req.body.idTurma} ` + _messages_pt2.default.NOT_FOUND
                })
            }   
            
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
                    error: _messages_pt2.default.STUDENT_WITHOUT_PROEFICIENCY_LEVEL
                })
            }

            const relacao = await _alunoisfparticipaturmaoc2.default.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino
            })

            return res.status(201).json(relacao)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }    
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()