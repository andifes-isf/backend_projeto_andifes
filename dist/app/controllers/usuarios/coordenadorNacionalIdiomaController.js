"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _coordenadornacionalIdioma = require('../../models/usuarios/coordenadornacionalIdioma'); var _coordenadornacionalIdioma2 = _interopRequireDefault(_coordenadornacionalIdioma);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _alteracaoturmaespecializacao = require('../../models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, _userTypes2.default.LANGUAGE_NATIONAL_COORDINATOR)

            const existingCoordinator = await _coordenadornacionalIdioma2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingCoordinator) {
                return res.status(409).json({
                    error: `${existingCoordinator.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
    
            const coordinator = await _coordenadornacionalIdioma2.default.create({
                login: req.body.login,
                idioma: req.body.idioma
            })

            return res.status(201).json(coordinator)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)      
        }
    }

    async get(_, res){
        try {
            const coordinators = await _coordenadornacionalIdioma2.default.findAll({
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

    static async verifyExistingClass(nome) {
        return await _turmadisciplinaespecializacao2.default.findOne({ 
            where: { nome } 
        })
    }

    static async isChanged(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await _alteracaoturmaespecializacao2.default.findOne({
            order: [
                ['dataModificacao', 'DESC']
            ]
        })
        if (!alteracao || !(alteracao.valorPosteriorNumeroMinimoAlunos === numeroMinimoAlunos && alteracao.valorPosteriorNumeroVagas === numeroVagas))
            return 1
        return 0
    }
    
    static async change(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await _alteracaoturmaespecializacao2.default.create({
            login: login,
            nomeTurma: turma.nome,
            valorAnteriorNumeroVagas: turma.numeroVagas,
            valorPosteriorNumeroVagas: numeroVagas === undefined ? turma.numeroVagas : numeroVagas,
            valorAnteriorNumeroMinimoAlunos: turma.numeroMinimoAlunos,
            valorPosteriorNumeroMinimoAlunos: numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos
        })
    }

    static async updateClassRegister(turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
        turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

        await turma.save()
    }
    
    async updateData(req, res){
        try {
            
            const { nome } = req.params
            const { loginUsuario, tipoUsuario } = req
            
            if(!(req.tipoUsuario) === _userTypes2.default.LANGUAGE_NATIONAL_COORDINATOR){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }
            
            const existingClass = await coordenadorNacionalIdiomaController.verifyExistingClass(nome);
            
            if (!existingClass) {
                return res.status(404).json({
                    error: `${nome} ` + _messages_pt2.default.NOT_FOUND 
                })
            }
            
            if(!(await coordenadorNacionalIdiomaController.isChanged(loginUsuario, existingClass, req.body))) {
                return res.status(409).json({
                    error: _messages_pt2.default.ANY_CHANGE
                })
            }
            
            console.log("TESTE")
            await coordenadorNacionalIdiomaController.change(loginUsuario, existingClass, req.body)
            
            await coordenadorNacionalIdiomaController.updateClassRegister(existingClass, req.body)
            
            return res.status(201).json(existingClass)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)  
        }
    }
}

exports. default = new coordenadorNacionalIdiomaController()