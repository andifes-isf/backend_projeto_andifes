"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

// Modelscursistacursaturmaespecializacao"
var _InteresseNaDisciplina = require('../../models/curso_especializacao/InteresseNaDisciplina'); var _InteresseNaDisciplina2 = _interopRequireDefault(_InteresseNaDisciplina);
var _ouvidoria_curso_especializacao = require('../../models/curso_especializacao/ouvidoria_curso_especializacao'); var _ouvidoria_curso_especializacao2 = _interopRequireDefault(_ouvidoria_curso_especializacao);

// Controllers
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

// Repositories
var _PracticalReportRepository = require('../../repositories/specialization_course/PracticalReportRepository'); var _PracticalReportRepository2 = _interopRequireDefault(_PracticalReportRepository);
var _NotificationRepository = require('../../repositories/utils/NotificationRepository'); var _NotificationRepository2 = _interopRequireDefault(_NotificationRepository);
var _SpecializationStudentRepository = require('../../repositories/user/SpecializationStudentRepository'); var _SpecializationStudentRepository2 = _interopRequireDefault(_SpecializationStudentRepository);
var _SpecializationDisciplineClassRepository = require('../../repositories/specialization_course/SpecializationDisciplineClassRepository'); var _SpecializationDisciplineClassRepository2 = _interopRequireDefault(_SpecializationDisciplineClassRepository);
var _SpecializationDisciplineRepository = require('../../repositories/specialization_course/SpecializationDisciplineRepository'); var _SpecializationDisciplineRepository2 = _interopRequireDefault(_SpecializationDisciplineRepository);

// Utils
var _notificationType = require('../../utils/notificationType/notificationType'); var _notificationType2 = _interopRequireDefault(_notificationType);
var _languageFactory = require('../../utils/languages/languageFactory'); var _languageFactory2 = _interopRequireDefault(_languageFactory);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _referencedModel = require('../../utils/referencedModel/referencedModel'); var _referencedModel2 = _interopRequireDefault(_referencedModel);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

class CursistaEspecializacaoController extends _professorIsFController2.default {
    // Auxiliar Functions
    static async getEntities(login){
        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(login)
        const advisor = await _SpecializationStudentRepository2.default.getAdvisor(specializationStudent)

        console.log(advisor)        
        
        return [ specializationStudent, advisor[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static verifyLanguage(language) {
        return _languageFactory2.default.getLanguage(language)
    }

    static async createReport(specializationStudent, advisor, material){
        const { language, name, level, description, workload, portfolio_link, category } = material

        if(CursistaEspecializacaoController.verifyLanguage(language) == null) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.LANGUAGE_NOT_FOUND,
                _ErrorType2.default.NOT_FOUND
            )            
        }

        return await _SpecializationStudentRepository2.default.createPracticalReport(specializationStudent, {
            idioma: language,
            nome: name,
            nivel: level,
            descricao: description,
            cargaHoraria: workload,
            orientador: advisor.login,
            link_portfolio: portfolio_link,
            categoria: category,
        })
    }

    static async verifyExistingReport(login, name) {
        const existinReport = await _PracticalReportRepository2.default.findOne(login, name)

        if (existinReport) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_PRACTICAL_REPORT,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async inserirInteresse(discipline, year, specializationStudent){
        const { name } = discipline

        const existingDiscipline = await _SpecializationDisciplineRepository2.default.findOne(name)

        if (!existingDiscipline) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.DISCIPLINE_NOT_FOUND + name,
                _ErrorType2.default.NOT_FOUND
            )
        }
        
        const existingInterest = await _InteresseNaDisciplina2.default.findOne({
            where: {
                login: specializationStudent.login,
                nomeDisciplina: name,
                ano: year
            }
        })

        if (existingInterest) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + name,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }

        await specializationStudent.createInteresse({
            ano: year,
            nomeDisciplina: name,
            preferencia: discipline.preference
        })
    }

    static async inserirDisciplinas(data, specializationStudent){
        const disciplines = data.disciplines
        const year = data.year
        
        const promises = disciplines.map(async (discipline) => {
            const insertInterest = await CursistaEspecializacaoController.inserirInteresse(discipline, year, specializationStudent)
            
            if (insertInterest) {
                return {
                    error: true,
                    errorInfo: insertInterest
                }
            }

            return {
                error: false,
                discipline: discipline.name
            }
        })
        
        const results = await Promise.allSettled(promises)
        let success = []
        let fail = []
        let unexpectedError = []
        
        results.forEach((result) => {

            if (result.value.error === false) {
                success.push({message: _messages_pt2.default.NEW_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + result.value.discipline})
            } else if (result.value.error === true) {
                fail.push([{message: result.value.errorInfo.message, name: result.value.errorInfo.name}])
            } else {
                unexpectedError.push({message: `Erro inesperado:` + result.reason})
            }
        })

        return { success: success, fail: fail, unexpectedError: unexpectedError}
    }

    // Endpoints
    
    /**
    *
    * @route POST /specialization_student
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
    * @param {string} req.body.poca - For now is just a string representing the user's POCA certificate 
    * @param {date} req.body.start
    * 
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
    * @returns {CursistaEspecializacao} data
    */
    async post(req, res) {
        const existingSpecializationStudent = await CursistaEspecializacaoController.verifyExistingObject(_SpecializationStudentRepository2.default, req.body.login, _messages_pt2.default.EXISTING_SPECIALIZATION_STUDENT)
        
        if (existingSpecializationStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingSpecializationStudent.message,
                errorName: existingSpecializationStudent.name
            })
        }
        
        const { error, result } = await CursistaEspecializacaoController.postIsFTeacher(req, res, 1)

        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                result
            })
        }
        
        const specializationStudent = await _SpecializationStudentRepository2.default.create({
            login: req.body.login
        })
        
        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: specializationStudent
        })
    }

    /**
     * 
     * @route GET /specialization_student
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {CursistaEspecializacao[]} data
     */
    async get(_, res){
        const specializationStudents = await _SpecializationStudentRepository2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: specializationStudents
        })
    }
    
    /**
     * 
     * @route POST /specialization_student/practical_report
     * @requires Authentication
     * 
     * @param {string} req.body.language - The language of the report. It must be one of the following:
     * 1 - "ingles"
     * 2 - "portugues",
     * 3 - "alemao"
     * 4 - "frances"
     * 5 - "italiano"
     * 6 - "espanhol"
     * 7 - "japones"
     * @param {string} req.body.name
     * @param {char[2]} req.body.level - The level of the report
     * - For japanese, it should be used N5 -> N1
     * - For other languages, it should be used A1 -> C2
     * @param {string} req.body.description
     * @param {int} req.body.workload
     * @param {portfolio_link} req.body.portfolio_link
     * @param {string} req.body.category - The category of the report. It must be one of the following:
     * 1 - "preparacao do curso"
     * 2 - "preparacao material didatico"
     * 3 - "preparacao de atividades"
     * 4 - "preparacao de aulas"
     * 5 - "preparacao de oficinas"
     * 6 - "preparacao de testes de nivelamento"
     * 
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data
     */
    async postPracticalReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const existingReport = await CursistaEspecializacaoController.verifyExistingReport(req.loginUsuario, req.body.name)
        
        if(existingReport){
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingReport.message,
                errorName: existingReport.name
            })
        }
        
        const [specializationStudent, advisor] = await        CursistaEspecializacaoController.getEntities(req.loginUsuario)

        const report = await CursistaEspecializacaoController.createReport(specializationStudent, advisor, req.body)
        
        if(report instanceof _CustomError2.default) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: report.message,
                errorName: report.name
            })
        }

        await _NotificationRepository2.default.create({
            login: advisor.login,
            mensagem: `${req.loginUsuario} ` + _messages_pt2.default.NEW_MATERIAL,
            tipo: _notificationType2.default.PENDENCIA,
            chaveReferenciado: req.body.name,
            modeloReferenciado: _referencedModel2.default.PRACTICAL_REPORT
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: report
        })
    }

    /**
     * @route GET /specialization_student/my_practical_report
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico[]} data 
     */
    async getMyMaterials(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }       

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)

        const myMaterials = await specializationStudent.getMaterial()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: myMaterials
        })
    }

    /**
     * 
     * @route GET /specialization_student/practical_report_not_viewed
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico[]} data - Only materials that the student didn't check after advisor analisys
     */
    async getNotViewedMaterials(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)

        const materials = await specializationStudent.getMaterial({
            where: {
                visualizado_pelo_cursista: false
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: materials
        })
    }

    /**
     * 
     * @route GET /specialization_student/practical_report/:name
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async getMaterial(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)

        const material = await _SpecializationStudentRepository2.default.getMaterial(specializationStudent, req.params.name)

        if (material.length === 0) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.PRACTICAL_REPORT_NOT_FOUND + req.params.name,
                errorName: _ErrorType2.default.NOT_FOUND
            })
        }

        if(!(material[0].data_avaliacao == null)) {
            material[0].visualizado_pelo_cursista = true
            await material[0].save()
        }

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: material
        })
    }

    /**
     * 
     * @route POST /specialization_student/class/:name
     * @requires Authentication
     * 
     * @param {string} req.params.nome_turma - The class that the student will be part of
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async postCursaTurma(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)
        const classObject = await _SpecializationDisciplineClassRepository2.default.findByPk(req.params.name)

        if(classObject == null) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.CLASS_NOT_FOUND + req.params.name,
                errorName: _ErrorType2.default.NOT_FOUND
            })
        }

        if(await _SpecializationStudentRepository2.default.isInClass(specializationStudent, classObject)){
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.EXISTING_CLASS_SPECIALIZATIONSTUDENT_RELATIONSHIP,
                errorName: _ErrorType2.default.DUPLICATE_ENTRY
            })
        }

        await _SpecializationStudentRepository2.default.addClass(specializationStudent, classObject)
        const classes = await _SpecializationStudentRepository2.default.getClasses(specializationStudent)

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: classes
        })
    }

    /**
     * 
     * @route GET /specialization_student/my_classes
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async getMinhasTurmas(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)

        const myClasses = await specializationStudent.getTurma()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: myClasses
        })
    }

    /**
     * 
     * @route POST /specialization_student/interest_in_discipline
     * @requires Authentication
     * 
     * @param {int} req.body.year - The year of the request 
     * @param {Object[]} req.body.disciplines - The list of the disciplines that the student is interested 
     * @param {string} req.body.disciplines.name 
     * @param {int} req.body.disciplines.preference - The higher the value, the greater the desire to join the class
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * @returns {object} data
     * @returns {object[]} data.success
     * @returns {string} data.success.message
     * @returns {object[]} data.fail
     * @returns {string} data.success.message - The error's message
     * @returns {string} data.success.name - The error's name
     * @returns {object[]} data.unexpectedError
     * @returns {string} data.unexpectedError.message
     */
    async postInteresseNaDisciplina(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)
        const data = req.body

        const status = await CursistaEspecializacaoController.inserirDisciplinas(data, specializationStudent)
        
        if(status.fail.length === 0 && status.unexpectedError.length === 0) {
            const success = status.success
            return res.status(_httpStatus2.default.CREATED).json({
                error: false,
                success
            })
        }
        return res.status(_httpStatus2.default.BAD_REQUEST).json({
            error: true,
            data: status})
    }

    /**
     * 
     * @route POST /specialization_student/feedback
     * @requires Authentication
     * 
     * @param {string} req.body.message_topic - The topic of the feedback. It value must be one of the follow: 
     * 1 - "orientações"
     * 2 - "aulas moodle"
     * 3 - "horas práticas"
     * 4 - "questões administrativas"
     * 5 - "outros"
     * @param {string} req.body.message
     * @param {boolean} req.body.anonymous - Represents if an feedback is anonymous or not
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data  
     */
    async postReclamation(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const { message_topic, message, anonymous } = req.body
        
        const reclamation = await _ouvidoria_curso_especializacao2.default.create({
            topico_mensagem: message_topic,
            mensagem: message,
            anonimo: anonymous,
            login: anonymous ? null : req.loginUsuario
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            reclamation
        })
    }

    /**
     * 
     * @requires Authentication
     * @route POST /specialization_student/guidance_report
     * 
     * @param {int} req.body.workload
     * @param {string} req.body.note
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be:
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
     * @returns {GuidanceReport} data
     */
    async postGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const [student, advisor] = await CursistaEspecializacaoController.getEntities(req.loginUsuario)

        const report = await _SpecializationStudentRepository2.default.createGuidanceReport(student, req.body) 

        await _NotificationRepository2.default.create({
            login: advisor.login,
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
     * @route GET /specialization_student/guidance_report
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be:
     * 201 - SUCCESS
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

        const authorizationError = CursistaEspecializacaoController.verifyUserType([_userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const student = await _SpecializationStudentRepository2.default.findByPk(req.loginUsuario)

        const report = await _SpecializationStudentRepository2.default.getGuidanceReport(student) 

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: report
        })
    }    
}

exports. default = new CursistaEspecializacaoController()