"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Utils
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _notificationType = require('../../utils/notificationType/notificationType'); var _notificationType2 = _interopRequireDefault(_notificationType);

// Models
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _docenteorientador = require('../../models/usuarios/docenteorientador'); var _docenteorientador2 = _interopRequireDefault(_docenteorientador);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _notificacao = require('../../models/utils/notificacao'); var _notificacao2 = _interopRequireDefault(_notificacao);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);
var _OrientadorOrientaCursista = require('../../models/curso_especializacao/OrientadorOrientaCursista'); var _OrientadorOrientaCursista2 = _interopRequireDefault(_OrientadorOrientaCursista);
var _relatorio_pratico = require('../../models/curso_especializacao/relatorio_pratico'); var _relatorio_pratico2 = _interopRequireDefault(_relatorio_pratico);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _referencedModel = require('../../utils/referencedModel/referencedModel'); var _referencedModel2 = _interopRequireDefault(_referencedModel);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);


class DocenteOrientadorController extends _usuarioController2.default{
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, _userTypes2.default.ADVISOR_TEACHER)

            const existingTeacher = await _docenteorientador2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingTeacher) {
                return res.status(409).json({
                    error: `${existingTeacher.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
    
            const teacher = await _docenteorientador2.default.create({
                login: req.body.login
            })

            return res.status(201).json(teacher)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)            
        }
    }

    async get(_, res){
        try {
            const teachers = await _docenteorientador2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(teachers)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postOrientado(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const advisor = await _docenteorientador2.default.findByPk(req.loginUsuario)
            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.body.loginCursista)
            
            if(!specializationStudent){
                return res.status(422).json({
                    error: `${req.body.loginCursista} ` + _messages_pt2.default.NOT_FOUND
                })
            }

            const existing = await advisor.hasOrientado(specializationStudent)
            if(existing){
                return res.status(422).json({
                    error: _messages_pt2.default.ADVISOR_ADVISES_STUDENT
                })
            }

            await advisor.addOrientado(specializationStudent)

            const relation = await _OrientadorOrientaCursista2.default.findOne({
                where: {
                    loginCursista: cursista.login,
                    loginOrientador: orientador.login
                }
            })

            relation.inicio = new Date().toISOString().split("T")[0]
            await relation.save()

            return res.status(200).json(relation)

        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMenteesMaterials(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const advisor = await _docenteorientador2.default.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis()

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotEvaluatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const advisor = await _docenteorientador2.default.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis({
                where: {
                    data_avaliacao: null
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotValidatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const advisor = await _docenteorientador2.default.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis({
                where: {
                    data_avaliacao: {
                        [_sequelize2.default.ne]: null
                    },
                    validado: false
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async putEvaluateMaterial(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const report = await _relatorio_pratico2.default.findOne({
                where: {
                    nome: req.params.material_name,
                    orientador: req.loginUsuario
                }
            })

            if(report == null) {
                throw new Error(`Relatório prático ` + _messages_pt2.default.NOT_FOUND)
            }

            if(req.body.validated){
                report.validado = true
            } else {
                if(!req.body.feedback){
                    return res.status(400).json({
                        error: _messages_pt2.default.FEEDBACK_IS_NEEDED
                    })
                }
                report.feedback = req.body.feedback
            }

            report.visualizado_pelo_cursista = false
            report.data_avaliacao = new Date()
            await report.save()

            const notification = await _notificacao2.default.create({
                login: report.login,
                mensagem: `Material "${report.nome}" foi ${report.validado ? "aprovado" : "recusado"} pelo seu orientador`,
                tipo: _notificationType2.default.FEEDBACK,
                chaveReferenciado: report.nome,
                modeloReferenciado: _referencedModel2.default.PRACTICAL_REPORT,
            })

            return res.status(200).json([report, notification])

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    /**
     * 
     * @requires Authentication
     * @route POST /advisor_teacher/guidance_report
     * 
     * @param {int} req.body.workload
     * @param {string} req.body.note - it can be null
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @return {GuidanceReport} data
     * 
     */
    async postGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([_userTypes2.default.ADVISOR_TEACHER], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const teacher = await _docenteorientador2.default.findByPk(req.loginUsuario)

        const report = await teacher.createGuidanceReport({
            workload: req.body.workload,
            note: req.body.note || null,
            report_type: new Date().toISOString().split('T')[0]
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: report
        })
    }

    /**
     * 
     * @requires Authentication
     * @route GET /advisor_teacher/guidance_report
     * 
     * @return {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {GuidanceReport[]} data 
     */
    async getGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([_userTypes2.default.ADVISOR_TEACHER], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const teacher = await _docenteorientador2.default.findByPk(req.loginUsuario)

        const reports = await teacher.getGuidanceReport()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: reports
        })
    }
}

exports. default = new DocenteOrientadorController()