"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Precisa, no futuro, trocar esse InstituicaoEnsino pelo InstitutionRepository

var _usuarioController = require('../../user/usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

// Repositories
var _IsFTeacherRepository = require('../../repositories/user/IsFTeacherRepository'); var _IsFTeacherRepository2 = _interopRequireDefault(_IsFTeacherRepository);
var _InstitutionRepository = require('../../repositories/institution/InstitutionRepository'); var _InstitutionRepository2 = _interopRequireDefault(_InstitutionRepository);

// Utils
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);


class ProfessorIsFController extends _usuarioController2.default {
    // Auxiliar Functions

    static async postIsFTeacher(req, res, specialization_student) {
        const existingTeacher = await ProfessorIsFController.verifyExistingObject(_IsFTeacherRepository2.default, req.body.login, _messages_pt2.default.EXISTING_ISF_TEACHER)

        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }

        const { error, result} = await ProfessorIsFController.postUser(req, res, specialization_student ? _userTypes2.default.CURSISTA : _userTypes2.default.ISF_TEACHER)

        if (error) {
            return {
                error: true,
                result
            }
        }

        const teacher = await _IsFTeacherRepository2.default.create({
            login: req.body.login,
            poca: req.body.poca,
            start: req.body.start,
            end: req.body.end,
            specialization_student: specialization_student
        })

        return {
            error: false,
            result: teacher
        }
    }

    static async verifyExistingProeficiency(login, language, level) {
        const existingProeficiency = await _IsFTeacherRepository2.default.verifyExistingProeficiency(login, language, level)

        if(existingProeficiency) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_PROEFICIENCY + language + " " +  level,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingRegistration(data) {
        const existingRegistrantion = await _IsFTeacherRepository2.default.findOneDocument(data)

        if(existingRegistrantion) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_INSTITUTION_USER_RELATIONSHIP + data.institutionId,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async closeRegistration(login) {
        const registration = await _IsFTeacherRepository2.default.findCurrentDocument(login)

        if (registration != null) {
            registration.termino = new Date().toISOString().split("T")[0]
            _InstitutionRepository2.default.save(registration)
        }
    }

    // Endpoints

    /**
    *
    * @route GET /isf_teacher 
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 200 - SUCCESS
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {ProfessorIsF} data
    */
    async get(_, res){
        const teachers = await _IsFTeacherRepository2.default.findAll()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: teachers
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /isf_teacher/proeficiency
    * 
    * @param {char[2]} level - The level of the proeficiency. 
    * For japanese, it should be used N5 -> N1
    * For other languages, it should be used A1 -> C2
    * @param {string} language - Indicates the language of the proeficiency. It must be one of the follow:
    * 1 - "ingles"
    * 2 - "portugues",
    * 3 - "alemao"
    * 4 - "frances"
    * 5 - "italiano"
    * 6 - "espanhol"
    * 7 - "japones"
    * @param {string} document - Document that proves the proeficiency
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
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
    * @returns {ProeficienciaProfessorIsF} data
    */  
    async postProeficiencia(req, res) {
        const userType = req.tipoUsuario
        
        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        } 

        const login = req.loginUsuario
        
        const { language, level, document } = req.body

        const existingProeficiencyError = await ProfessorIsFController.verifyExistingProeficiency(login, language, level)

        if(existingProeficiencyError) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await _IsFTeacherRepository2.default.createProeficiency(login, level, language, document)

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: proeficiency
        })  
    }

    /**
    *
    * @requires Authentication
    * @route GET /isf_teacher/my_proeficiency
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
    * @returns {ProeficienciaProfessorIsF[]} data
    */
    async getMinhaProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await _IsFTeacherRepository2.default.findAllProeficiencies(req.loginUsuario)

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: proeficiencies
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /specialization_student/institution/:institutionId
    * 
    * @param {int} req.params.institutionId
    * @param {date} req.body.start
    * @param {string} req.body.document
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
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
    * @returns {ComprovanteProfessorInstituicao} data
    */
    async postInstituicao(req, res) { 
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const data = {
            institutionId: req.params.institutionId,
            login: req.loginUsuario,
            start: req.body.start,
            document: req.body.document
        }

        const nonExistingInstitution = await ProfessorIsFController.verifyNonExistingObject(_InstitutionRepository2.default, data.institutionId, _messages_pt2.default.EXISTING_INSTITUTION)

        if(nonExistingInstitution) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.INSTITUTION_NOT_FOUND + data.institutionId,
                errorName: _ErrorType2.default.NOT_FOUND
            })
        }
        
        
        const existingRegistration = await ProfessorIsFController.verifyExistingRegistration(data)
        
        if (existingRegistration) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }
        
        await ProfessorIsFController.closeRegistration(data.login)
        const registration = await _IsFTeacherRepository2.default.joinInstitution(data)

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            data: registration
        })    
    }

    /**
     *
     * @requires Authentication
     * @route GET /isf_teacher/my_institutions
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
     * @returns {ComprovanteProfessorInstituicao[]} data
     * 
     * @returns 
     */
    async getMinhasInstituicoes(req, res){
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registrations = await _IsFTeacherRepository2.default.findAllDocuments(req.loginUsuario)

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: registrations
        })
    }

    /**
     *
     * @requires Authentication
     * @route GET /isf_teacher/current_institution
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
     * @returns {ComprovanteProfessorInstituicao} data
     * 
     * @returns 
     */
    async getInstituicaoAtual(req, res){
        const userType = req.tipoUsuario
        
        const authorizationError = ProfessorIsFController.verifyUserType([_userTypes2.default.ISF_TEACHER, _userTypes2.default.CURSISTA], userType)

        if (authorizationError) {
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await _IsFTeacherRepository2.default.findCurrentDocument(req.loginUsuario)

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            data: registration
        })
    }
}

exports. default = ProfessorIsFController