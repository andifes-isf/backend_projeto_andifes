"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _coordenadornacional = require('../../models/usuarios/coordenadornacional'); var _coordenadornacional2 = _interopRequireDefault(_coordenadornacional);
var _editalcursoespecializacao = require('../../models/curso_especializacao/editalcursoespecializacao'); var _editalcursoespecializacao2 = _interopRequireDefault(_editalcursoespecializacao);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class coordenadorNacionalController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, _userTypes2.default.NATIONAL_COORDINATOR)

            const existingCoordinator = await _coordenadornacional2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingCoordinator) {
                return res.status(409).json({
                    error: `${existingCoordinator.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
    
            const coordenador = await _coordenadornacional2.default.create({
                login: req.body.login,
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)           
        }
    }

    async get(_, res){
        try {
            const coordinators = await _coordenadornacional2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(coordinators)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postEdital(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.NATIONAL_COORDINATOR)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const existingEdital = await _editalcursoespecializacao2.default.findOne({
                where: {
                    ano: req.body.ano
                }
            })

            if(existingEdital) {
                return res.status(409).json({
                    error: `Edital de ${req.body.ano} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }

            const edital = await _editalcursoespecializacao2.default.create({
                ano: req.body.ano,
                documento: req.body.documento,
                link: req.body.link,
                criador: req.loginUsuario
            })

            return res.status(201).json(edital)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new coordenadorNacionalController()