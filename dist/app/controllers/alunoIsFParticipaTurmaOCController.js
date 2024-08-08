"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _alunoisfparticipaturmaoc = require('../models/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);

class AlunoIsFParticipaTurmaOCController {
    async post(req, res) {
        try {
            const relacao = await _alunoisfparticipaturmaoc2.default.findOne({
                where: {
                    login: req.body.login,
                    idTurma: req.body.idTurma,
                    inicio: req.body.inicio
                }
            })
            
            if(relacao) {
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            const comprovante = await _alunoisfparticipaturmaoc2.default.create({
                idTurma: req.body.idTurma,
                login: req.body.login,
                inicio: req.body.inicio,
                termino: req.body.termino || null
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()