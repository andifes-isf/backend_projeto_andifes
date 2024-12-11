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

// Repository
var _NotificationRepository = require('../../repositories/utils/NotificationRepository'); var _NotificationRepository2 = _interopRequireDefault(_NotificationRepository);
var _AdvisorTeacherRepository = require('../../repositories/user/AdvisorTeacherRepository'); var _AdvisorTeacherRepository2 = _interopRequireDefault(_AdvisorTeacherRepository);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _referencedModel = require('../../utils/referencedModel/referencedModel'); var _referencedModel2 = _interopRequireDefault(_referencedModel);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _SpecializationStudentRepository = require('../../repositories/user/SpecializationStudentRepository'); var _SpecializationStudentRepository2 = _interopRequireDefault(_SpecializationStudentRepository);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class DocenteOrientadorController extends _usuarioController2.default{
    // UTILS
    static async verifyMenteeCondition(login, advisor_login) {
        const mentee = await DocenteOrientadorController.verifyNonExistingObject(_SpecializationStudentRepository2.default, login, _messages_pt2.default.USER_NOT_FOUND)

        if (mentee.has_mentor == true) {
            const advisor = await mentee.getActiveMentorship()

            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_MENTORSHIP + advisor[0].login,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }

        return mentee
    }

    static async deleteMentorship(advisor_login, mentee_login) {
        const relation = await _AdvisorTeacherRepository2.default.getMentorship(advisor_login, mentee_login)

        if (relation == null) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.MENTORSHIP_NOT_FOUND + mentee_login,
                _ErrorType2.default.NOT_FOUND
            )
        }

        await _AdvisorTeacherRepository2.default.deleteMentorship(relation)

        // Aqui seria um local para observer? o cursista precisa ficar olhando para ver se esse relacionamento não sera cortado, e caso seja ele precis settar seu has_mentor para false
        const mentee = await _SpecializationStudentRepository2.default.findByPk(mentee_login)

        mentee.has_mentor = false
        await mentee.save()

        return relation
    }


    /**
     * 
     * @route POST /advisor_teacher
     * 
     * @param {string} req.body.login
     * @param {string} req.body.name
     * @param {string} req.body.surname
     * @param {int} req.body.DDI
     * @param {int} req.body.DDD
     * @param {int} req.body.phone
     * @param {int || string} req.body.ethnicity - The ethnicity of the user. Must be one of the following (int - "value"): 
     * 1 - "amarelo"
     * 2 - "branco"
     * 3 - "indigena"
     * 4 - "pardo"
     * 5 - "preto"
     * 6 - "quilombola"
     * @param {int || string} req.body.gender - The gender of the user. Must be one of the following (int - "value"): 
     * 1 - "feminino"
     * 2 - "masculino"
     * 3 - "nao binario"
     * 4 - "outros"
     * @param {string} req.body.email
     * @param {int || string} req.body.email_domain - The email domain of the user's email. Must be one of the following (int - "value"):
     * 1 - "gmail.com"
     * 2 - "yahoo.com"
     * 3 - "outlook.com"
     * 4 - "hotmail.com"
     * @param {string} req.body.password
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {DocenteOrientador} data
     */
     async post(req, res) {
         const existingTeacher = await DocenteOrientadorController.verifyExistingObject(_AdvisorTeacherRepository2.default, req.body.login, _messages_pt2.default.EXISTING_ADVISOR_TEACHER)

        if(existingTeacher) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingTeacher.message,
                errorName: existingTeacher.name
            })
        }

        
        const { error, user } = await DocenteOrientadorController.postUser(req, res, _userTypes2.default.ADVISOR_TEACHER)
        
        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: user.message,
                errorName: user.name
            })
        }
        
        const teacher = await _AdvisorTeacherRepository2.default.create(req.body.login)
        
        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: teacher
        })
    }

    /**
     * 
     * @route GET /advisor_teacher
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if error is true
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {DocenteOrientador[]} data
     */
    async get(_, res){
        const teachers = await _AdvisorTeacherRepository2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: teachers
        })
    }

    /**
     * 
     * @requires Authentication
     * @route POST /advisor_teacher/mentee
     * 
     * @param {string} req.body.mentee_login 
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be one of the follow:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message - error's message 
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {OrientadorOrientaCursista} data 
     */
    async postOrientado(req, res){
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([_userTypes2.default.ADVISOR_TEACHER], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const advisor = await _AdvisorTeacherRepository2.default.findByPk(req.loginUsuario)
        const specializationStudent = await DocenteOrientadorController.verifyMenteeCondition(req.body.mentee_login)

        if(specializationStudent instanceof _CustomError2.default){
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: specializationStudent.message,
                errorName: specializationStudent.name
            })
        }

        const relation = await _AdvisorTeacherRepository2.default.createMentorship(advisor.login, specializationStudent)

        return res.status(200).json({
            error: false,
            data: relation
        })
    }

    /**
     * 
     * @requires Authentication
     * @route DELETE /advisor_teacher/mentee
     * 
     * @param {string} req.body.mentee_login 
     * 
     * RETORNO
     * @returns {int} httpStatus - It might be one of the follow:
     * 200 - SUCCESS
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR 
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message
     * @returns {string} errorName
     * 
     * if error is false
     * @returns {OrientadorOrientaCursista} data
     */
    async deleteOrientado(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([_userTypes2.default.ADVISOR_TEACHER], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const relation = await DocenteOrientadorController.deleteMentorship(req.loginUsuario, req.body.mentee_login)

        if (relation instanceof _CustomError2.default) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: relation.message,
                errorName: relation.name
            })
        }

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: relation
        })
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
        const student = await teacher.getMentee()

        const report = await teacher.createGuidanceReport({
            workload: req.body.workload,
            note: req.body.note || null,
            report_type: 'advisor_teacher',
            created_at: new Date().toISOString().split('T')[0]
        })



        await _NotificationRepository2.default.create({
            login: student[0].login,
            mensagem: req.loginUsuario + _messages_pt2.default.NEW_GUIDANCE_REPORT,
            tipo: _notificationType2.default.AVISO,
            chaveReferenciado: report.id,
            modeloReferenciado: _referencedModel2.default.GUIDANCE_REPORT
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