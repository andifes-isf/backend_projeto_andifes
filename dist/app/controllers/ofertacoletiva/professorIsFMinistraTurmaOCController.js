"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _professorisfministraturmaoc = require('../../models/ofertacoletiva/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);
var _proeficienciaprofessorisf = require('../../models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Utils
var _nivelFactory = require('../../utils/niveis/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);

class ProfessorIsFMinistraTurmaOCController {
    static async verifyExistingClass(classId) {
        const classObject = await _turmaoc2.default.findByPk(classId)

        if (!classObject) {
            throw new (0, _CustomError2.default)(`Turma ${classId} ` + _messages_pt2.default.NOT_FOUND, _httpStatus2.default.BAD_REQUEST)
        }

        return classObject
    }

    static async verifyTeacherMinisteringClass(login, classId) {
        const teacherMinisteringClass = await _professorisfministraturmaoc2.default.findOne({
            where: {
                login: login,
                idTurma: classId
            }
        })

        if(teacherMinisteringClass){
            throw new (0, _CustomError2.default)(`${login} ` + _messages_pt2.default.ALREADY_MINISTERING_CLASS, _httpStatus2.default.BAD_REQUEST)
        }
    }

    static async verifyTeacherProeficiency(course, proeficiency) {
        const proeficiencyLevel = _nivelFactory2.default.createInstanceOfNivel(course.idioma)

        const levelDifference = proeficiencyLevel.distanciaEntreNiveis(proeficiency ? proeficiency.nivel : 'nenhum', course.nivel)

        if(levelDifference < 0) {
            throw new (0, _CustomError2.default)(_messages_pt2.default.USER_WITHOUT_PROEFICIENCY_LEVEL, _httpStatus2.default.BAD_REQUEST)
        }
    }

    async post(req, res) {
        if(!(req.tipoUsuario === _userTypes2.default.ISF_TEACHER || req.tipoUsuario === _userTypes2.default.CURSISTA)){
            return res.status(_httpStatus2.default.UNAUTHORIZED).json({
                error: _messages_pt2.default.ACCESS_DENIED
            })
        }
        
        const classObejct = await ProfessorIsFMinistraTurmaOCController.verifyExistingClass(req.params.idTurma)

        await ProfessorIsFMinistraTurmaOCController.verifyTeacherMinisteringClass(req.loginUsuario, req.params.idTurma)

        // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
        
        const course = await _curso2.default.findOne({
            where: {
                idCurso: classObejct.idCurso
            }
        })
        
        const teacherProeficiency = await _proeficienciaprofessorisf2.default.findOne({
            where: {
                login: req.loginUsuario,
                idioma: course.idioma
            }
        })
        
        await ProfessorIsFMinistraTurmaOCController.verifyTeacherProeficiency(course, teacherProeficiency)
                
        const relation = await _professorisfministraturmaoc2.default.create({
            login: req.loginUsuario,
            idTurma: req.params.idTurma,
            inicio: req.body.inicio,
            termino: req.body.termino,
        })
        
        return res.status(_httpStatus2.default.CREATED).json(relation)

    }
}

exports. default = new ProfessorIsFMinistraTurmaOCController()