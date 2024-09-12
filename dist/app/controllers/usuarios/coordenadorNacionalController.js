"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _coordenadornacional = require('../../models/usuarios/coordenadornacional'); var _coordenadornacional2 = _interopRequireDefault(_coordenadornacional);

class coordenadorNacionalController {
    async post(req, res) {
        try {            
            const coordenadorExistente = await _coordenadornacional2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(coordenadorExistente) {
                return res.status(409).json({
                    msg: 'Coordenador Nacional ja cadastrado'
                })
            }
    
            const coordenador = await _coordenadornacional2.default.create({
                login: req.body.login
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const coordenadores = await AlunoIsF.findAll({
                include: [
                    {
                        model: TurmaOC,
                        attributes: {
                            exclude: ['idTurma', 'idCurso', ]
                        },
                        include: {
                            model: Curso,
                            attributes: ['nome']
                        },
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
    
            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new coordenadorNacionalController()