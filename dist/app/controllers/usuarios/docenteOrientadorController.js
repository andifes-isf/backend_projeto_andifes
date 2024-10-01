"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _docenteorientador = require('../../models/usuarios/docenteorientador'); var _docenteorientador2 = _interopRequireDefault(_docenteorientador);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _OrientadorOrientaCursista = require('../../models/curso_especializacao/OrientadorOrientaCursista'); var _OrientadorOrientaCursista2 = _interopRequireDefault(_OrientadorOrientaCursista);

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, 'docenteorientador')

            const docenteExistente = await _docenteorientador2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(docenteExistente) {
                return res.status(409).json({
                    msg: 'Docente Orientador ja cadastrado'
                })
            }
    
            const docente = await _docenteorientador2.default.create({
                login: req.body.login
            })

            return res.status(201).json(docente)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const docentes = await _docenteorientador2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(docentes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async postOrientado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando as instâncias
            const orientador = await _docenteorientador2.default.findByPk(req.loginUsuario)
            const cursista = await _cursistaespecializacao2.default.findByPk(req.body.loginCursista)
            if(!cursista){
                return res.status(422).json({
                    error: "Cursista nao existente"
                })
            }

            // Verificando se esse orientado já orienta esse cursista
            const existente = await orientador.hasOrientado(cursista)
            if(existente){
                return res.status(422).json({
                    error: "Esse orientador ja orienta esse cursista"
                })
            }

            // Relacionando os dois
            await orientador.addOrientado(cursista)

            const relacao = await _OrientadorOrientaCursista2.default.findOne({
                where: {
                    loginCursista: cursista.login,
                    loginOrientador: orientador.login
                }
            })

            relacao.inicio = new Date().toISOString().split("T")[0]
            await relacao.save()

            return res.status(200).json(relacao)

        } catch (error) {
            console.log(error)
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

exports. default = new coordenadorNacionalIdiomaController()