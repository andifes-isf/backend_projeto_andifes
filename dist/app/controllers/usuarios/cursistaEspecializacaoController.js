"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

// Modelscursistacursaturmaespecializacao";
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _InteresseNaDisciplina = require('../../models/curso_especializacao/InteresseNaDisciplina'); var _InteresseNaDisciplina2 = _interopRequireDefault(_InteresseNaDisciplina);
var _relatorio_pratico = require('../../models/curso_especializacao/relatorio_pratico'); var _relatorio_pratico2 = _interopRequireDefault(_relatorio_pratico);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _ouvidoria_curso_especializacao = require('../../models/curso_especializacao/ouvidoria_curso_especializacao'); var _ouvidoria_curso_especializacao2 = _interopRequireDefault(_ouvidoria_curso_especializacao);
var _disciplinaespecializacao = require('../../models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);

// Controllers
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);

// Repositories
var _SpecializationStudentRepository = require('../../repositories/usuarios/SpecializationStudentRepository'); var _SpecializationStudentRepository2 = _interopRequireDefault(_SpecializationStudentRepository);
var _PracticalReportRepository = require('../../repositories/specialization_course/PracticalReportRepository'); var _PracticalReportRepository2 = _interopRequireDefault(_PracticalReportRepository);
var _NotificationRepository = require('../../repositories/utils/NotificationRepository'); var _NotificationRepository2 = _interopRequireDefault(_NotificationRepository);

// Utils
var _notificationType = require('../../utils/notificationType/notificationType'); var _notificationType2 = _interopRequireDefault(_notificationType);
var _languageFactory = require('../../utils/languages/languageFactory'); var _languageFactory2 = _interopRequireDefault(_languageFactory);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _referencedModel = require('../../utils/referencedModel/referencedModel'); var _referencedModel2 = _interopRequireDefault(_referencedModel);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _SpecializationDisciplineClassRepository = require('../../repositories/specialization_course/SpecializationDisciplineClassRepository'); var _SpecializationDisciplineClassRepository2 = _interopRequireDefault(_SpecializationDisciplineClassRepository);
var _SpecializationDisciplineRepository = require('../../repositories/specialization_course/SpecializationDisciplineRepository'); var _SpecializationDisciplineRepository2 = _interopRequireDefault(_SpecializationDisciplineRepository);

class CursistaEspecializacaoController extends _professorIsFController2.default {
    // Auxiliar Functions
    static async getEntities(login){
        const specializationStudent = await _SpecializationStudentRepository2.default.findByPk(login)
        const advisor = await _SpecializationStudentRepository2.default.getAdvisor(specializationStudent)
        
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

        return await _SpecializationStudentRepository2.default.createReport(specializationStudent, {
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
        const existingDiscipline = await _SpecializationDisciplineRepository2.default.findOne(discipline.nomeDisciplina)

        if (!existingDiscipline) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.DISCIPLINE_NOT_FOUND + discipline.nomeDisciplina,
                _ErrorType2.default.NOT_FOUND
            )
        }
        
        const existingInterest = await _InteresseNaDisciplina2.default.findOne({
            where: {
                login: specializationStudent.login,
                nomeDisciplina: discipline.nomeDisciplina,
                ano: year
            }
        })

        if (existingInterest) {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.EXISTING_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + discipline.nomeDisciplina,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }

        await specializationStudent.createInteresse({
            ano: year,
            nomeDisciplina: discipline.nomeDisciplina,
            preferencia: discipline.preferencia
        })
    }

    static async inserirDisciplinas(data, specializationStudent){
        const disciplines = data.interesse
        const year = data.ano
        
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
                discipline: discipline.nomeDisciplina
            }
        })
        
        const results = await Promise.allSettled(promises)
        let success = []
        let fail = []
        let unexpectedError = []

        results.forEach((result) => {
            if (result.value.error === false) {
                success.push(_messages_pt2.default.NEW_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + result.value.discipline)
            } else if (result.value.error === true) {
                fail.push([result.value.errorInfo.message, result.value.errorInfo.name])
            } else {
                unexpectedError.push(`Erro inesperado:`, result.reason);
            }
        })

        return { success: success, fail: fail, unexpectedError: unexpectedError}
    }

    // Endpoints
    
    async post(req, res) {
        const existingSpecializationStudent = await CursistaEspecializacaoController.verifyExistingObject(_SpecializationStudentRepository2.default, req.body.login, _messages_pt2.default.EXISTING_SPECIALIZATION_STUDENT)
        
        if (existingSpecializationStudent) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: existingSpecializationStudent.message,
                errorName: existingSpecializationStudent.name
            })
        }
        
        const { error, teacher } = await CursistaEspecializacaoController.postIsFTeacher(req, res, 1)

        if (error) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: teacher.message,
                errorName: teacher.name
            })
        }
        
        const specializationStudent = await _SpecializationStudentRepository2.default.create({
            login: req.body.login
        })

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            specializationStudent
        })
    }

    async get(_, res){
        const specializationStudents = await _cursistaespecializacao2.default.findAll({
            include: [
                {
                    model: _professorisf2.default,
                    attributes: {
                        exclude: ['login'],
                    },
                    include: [{
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }]
                }
            ]
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            specializationStudents
        })
    }
    
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
            report
        })
    }

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

        const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

        const myMaterials = await specializationStudent.getMaterial()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            myMaterials
        })
    }

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

        const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

        const materials = await specializationStudent.getMaterial({
            where: {
                visualizado_pelo_cursista: false
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            materials
        })
    }

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

        const [specializationStudent, advisor] = await CursistaEspecializacaoController.getEntities(req.loginUsuario)

        const material = await _SpecializationStudentRepository2.default.getMaterial(specializationStudent, req.params.nome)

        if (material.length === 0) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.PRACTICAL_REPORT_NOT_FOUND + req.params.nome,
                errorName: _ErrorType2.default.NOT_FOUND
            })
        }

        if(!(material[0].data_avaliacao == null)) {
            material[0].visualizado_pelo_cursista = true
            await material[0].save()
        }

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            material
        })
    }

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
        const classObject = await _SpecializationDisciplineClassRepository2.default.findByPk(req.params.nome_turma)

        if(classObject == null) {
            return res.status(_httpStatus2.default.BAD_REQUEST).json({
                error: true,
                message: _messages_pt2.default.CLASS_NOT_FOUND + req.params.nome_turma,
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

        await _SpecializationStudentRepository2.default.addClass(classObject)
        const classes = await _SpecializationStudentRepository2.default.getClasses()

        return res.status(_httpStatus2.default.CREATED).json({
            error: false,
            classes
        })
    }

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

        const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

        const myClasses = await specializationStudent.getTurma()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            myClasses
        })
    }

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
            status})
    }

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
}

exports. default = new CursistaEspecializacaoController()