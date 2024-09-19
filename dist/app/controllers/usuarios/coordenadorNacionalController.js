"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _coordenadornacional = require('../../models/usuarios/coordenadornacional'); var _coordenadornacional2 = _interopRequireDefault(_coordenadornacional);
var _editalcursoespecializacao = require('../../models/curso_especializacao/editalcursoespecializacao'); var _editalcursoespecializacao2 = _interopRequireDefault(_editalcursoespecializacao);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class coordenadorNacionalController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, 'coordenadornacional')

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
                login: req.body.login,
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const coordenadores = await _coordenadornacional2.default.findAll({
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

    async postEdital(req, res){
        try {
            // Verifica se o usuario logado é um coordenador nacional
            if(!(req.tipoUsuario === 'coordenadornacional')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Verifica se já existe
            const editalExistente = await _editalcursoespecializacao2.default.findOne({
                where: {
                    ano: req.body.ano
                }
            })

            if(editalExistente) {
                return res.status(409).json({
                    error: `Edital de ${req.body.ano} ja cadastrado`
                })
            }

            // Cria edital
            const edital = await _editalcursoespecializacao2.default.create({
                ano: req.body.ano,
                documento: req.body.documento,
                link: req.body.link,
                criador: req.loginUsuario
            })

            return res.status(201).json(edital)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new coordenadorNacionalController()