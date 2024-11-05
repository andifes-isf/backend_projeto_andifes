"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _alunoisfparticipaturmaoc = require('../../models/ofertacoletiva/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);
var _proeficienciaalunoisf = require('../../models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);
var _turmaoc = require('../../models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);
var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

// Utils
var _nivelFactory = require('../../utils/niveis/nivelFactory'); var _nivelFactory2 = _interopRequireDefault(_nivelFactory);
var _nivel = require('../../utils/niveis/nivel'); var _nivel2 = _interopRequireDefault(_nivel);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _httpStatus = require('../../utils/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);
var _CustomError = require('../../utils/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);


class AlunoIsFParticipaTurmaOCController {

    static async verifyExistingClass(classId) {
        const classObject = await _turmaoc2.default.findOne({
            where: {
                idTurma: classId
            }
        })

        if(!classObject){
            throw new (0, _CustomError2.default)(`Turma ${classId} ` + _messages_pt2.default.NOT_FOUND, _httpStatus2.default.BAD_REQUEST)
        }   

        return classObject
    }

    static async verifyStudentInClass(login, classId) {
        const studentInClass = await _alunoisfparticipaturmaoc2.default.findOne({
            where: {
                login: login,
                idTurma: classId
            }
        })

        if(studentInClass){
            throw new (0, _CustomError2.default)(`${login} ` + _messages_pt2.default.ALREADY_IN_CLASS, _httpStatus2.default.BAD_REQUEST)
        }
    }

    static async verifyStudentProeficiency(course, proeficiency) {
        const proeficiencyLevel = _nivelFactory2.default.createInstanceOfNivel(course.idioma)

        const levelDifference = proeficiencyLevel.distanciaEntreNiveis(proeficiency ? proeficiency.nivel : 'nenhum', course.nivel)
        
        if(levelDifference < -1) {
            throw new (0, _CustomError2.default)(_messages_pt2.default.USER_WITHOUT_PROEFICIENCY_LEVEL, _httpStatus2.default.BAD_REQUEST)
        }
    }
 
    async post(req, res) {
        if(!(req.tipoUsuario === _userTypes2.default.ISF_STUDENT)){
            throw new (0, _CustomError2.default)(_messages_pt2.default.ACCESS_DENIED, _httpStatus2.default.NOT_FOUND)
        }



        const classObject = await AlunoIsFParticipaTurmaOCController.verifyExistingClass(req.params.idTurma)
        
        await AlunoIsFParticipaTurmaOCController.verifyStudentInClass(req.loginUsuario, req.params.idTurma)
        
        const course = await _curso2.default.findOne({
            where: {
                idCurso: classObject.idCurso
            }
        })
        
        const studentProeficiency = await _proeficienciaalunoisf2.default.findOne({
            where: {
                login: req.loginUsuario,
                idioma: course.idioma
            },
            order: [
                ['nivel', 'DESC']
            ],
            limit: 1
        })

        await AlunoIsFParticipaTurmaOCController.verifyStudentProeficiency(course, studentProeficiency)

        const relation = await _alunoisfparticipaturmaoc2.default.create({
            login: req.loginUsuario,
            idTurma: req.params.idTurma,
            inicio: req.body.inicio,
            termino: req.body.termino
        })

        return res.status(_httpStatus2.default.CREATED).json(relation)
    }
}

exports. default = new AlunoIsFParticipaTurmaOCController()