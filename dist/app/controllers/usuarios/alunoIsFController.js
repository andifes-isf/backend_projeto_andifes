"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisf = require('../../models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);
var _proeficienciaalunoisf = require('../../models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);

// Controller
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Utils
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);


class alunoIsFController {
    async post(req, res, deInstituicao) {
        try {
            await _usuarioController2.default.post(req, res, 'alunoisf')
            
            const existingStudent = await _alunoisf2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingStudent) {
                return 0
            }
    
            return await _alunoisf2.default.create({
                login: req.body.login,
                deInstituicao: deInstituicao
            })
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)          
        }
    }

    async get(_, res){
        try {
            const students = await _alunoisf2.default.findAll({
                include: [
                    {
                        model: _turmaoc2.default,
                        attributes: {
                            exclude: ['idTurma', 'idCurso', ]
                        },
                        include: {
                            model: _curso2.default,
                            attributes: ['nome']
                        },
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
    
            return res.status(200).json(students)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_STUDENT)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }
    
            const existingProeficiency = await _proeficienciaalunoisf2.default.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: req.body.idioma,
                    nivel: req.body.nivel
                }
            })
    
            if(existingProeficiency) {
                return res.status(422).json({
                    error: "Proeficiência " + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
            
            const proeficiency = await _proeficienciaalunoisf2.default.create({
                login: req.loginUsuario,
                nivel: req.body.nivel,
                idioma: req.body.idioma,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(proeficiency)    
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhaProeficiencia(req, res) {
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ISF_STUDENT)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const proeficiaencias = await _proeficienciaalunoisf2.default.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(proeficiaencias)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new alunoIsFController()