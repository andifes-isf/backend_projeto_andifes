"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _coordenadornacionalIdioma = require('../../models/usuarios/coordenadornacionalIdioma'); var _coordenadornacionalIdioma2 = _interopRequireDefault(_coordenadornacionalIdioma);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, 'coordenadornacionalidioma')

            const coordenadorExistente = await _coordenadornacionalIdioma2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(coordenadorExistente) {
                return res.status(409).json({
                    msg: 'Coordenador Nacional ja cadastrado'
                })
            }
    
            const coordenador = await _coordenadornacionalIdioma2.default.create({
                login: req.body.login,
                idioma: req.body.idioma
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const coordenadores = await _coordenadornacionalIdioma2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(coordenadores)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new coordenadorNacionalIdiomaController()