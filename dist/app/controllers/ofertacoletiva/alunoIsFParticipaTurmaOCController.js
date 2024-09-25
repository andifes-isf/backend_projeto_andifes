"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisfparticipaturmaoc = require('../../models/ofertacoletiva/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _proeficienciaalunoisf = require('../../models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Classe auxiliar
var _nivelFactory = require('../../utils/niveis/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);
var _nivel = require('../../utils/niveis/nivel'); var _nivel2 = _interopRequireDefault(_nivel);

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(404).json({
                    error: 'Acesso negado'
                })
            }
    
            // Verifica se o aluno já está inserido na turma
            const alunoNaTurma = await _alunoisfparticipaturmaoc2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })

            if(alunoNaTurma){
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            // Verificando se o aluno pode se inscrever na turma
            const turma = await _turmaoc2.default.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })

            if(!turma){
                return res.status(422).json({
                    msg: "Turma nao encontrada"
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
                    msg: `${req.loginUsuario} possui proeficiencia muito abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }

            // Inserindo o aluno na turma
            const relacao = await _alunoisfparticipaturmaoc2.default.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino
            })

            return res.status(201).json(relacao)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }    
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()