"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

// Models
var _cursistacursaturmaespecializacao = require('../../models/curso_especializacao/cursistacursaturmaespecializacao'); var _cursistacursaturmaespecializacao2 = _interopRequireDefault(_cursistacursaturmaespecializacao);
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _InteresseNaDisciplina = require('../../models/curso_especializacao/InteresseNaDisciplina'); var _InteresseNaDisciplina2 = _interopRequireDefault(_InteresseNaDisciplina);
var _relatorio_pratico = require('../../models/curso_especializacao/relatorio_pratico'); var _relatorio_pratico2 = _interopRequireDefault(_relatorio_pratico);
var _notificacao = require('../../models/utils/notificacao'); var _notificacao2 = _interopRequireDefault(_notificacao);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);

// Controllers
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);
var _docenteorientador = require('../../models/usuarios/docenteorientador'); var _docenteorientador2 = _interopRequireDefault(_docenteorientador);


// Utils
var _notificationType = require('../../utils/notificationType/notificationType'); var _notificationType2 = _interopRequireDefault(_notificationType);
var _languageFactory = require('../../utils/languages/languageFactory'); var _languageFactory2 = _interopRequireDefault(_languageFactory);
var _userTypes = require('../../utils/userType/userTypes'); var _userTypes2 = _interopRequireDefault(_userTypes);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _referencedModel = require('../../utils/referencedModel/referencedModel'); var _referencedModel2 = _interopRequireDefault(_referencedModel);

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await _professorIsFController2.default.post(req, res, 1)
            
            const existingSpecializationStudent = await _cursistaespecializacao2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingSpecializationStudent) {
                return res.status(409).json({
                    error: `${existingSpecializationStudent.login} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }
            
            const specializationStudent = await _cursistaespecializacao2.default.create({
                login: req.body.login
            })
    
            return res.status(201).json(specializationStudent)
        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }

    }

    async get(_, res){
        try {
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

            return res.status(200).json(specializationStudents)
        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }

    }

    static async getEntities(login){
        const specializationStudent = await _cursistaespecializacao2.default.findByPk(login)
        const advisor = await specializationStudent.getOrientador({
            through: {
                where: {
                    status: "ativo"
                }
            }
        })

        return [ specializationStudent, advisor[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static verifyLanguage(language) {
        return _languageFactory2.default.getLanguage(language)
    }

    static async createReport(specializationStudent, advisor, material){
        const { idioma, name, level, description, workload, portfolio_link, category } = material

        if(CursistaEspecializacaoController.verifyLanguage(idioma) == null) {
            throw new Error('Idioma selecionado não suportado pelo sistema')
        }

        return await specializationStudent.createMaterial({
            idioma: idioma,
            nome: name,
            nivel: level,
            descricao: description,
            cargaHoraria: workload,
            orientador: advisor.login,
            link_portfolio: portfolio_link,
            categoria: category,
        })
    }
    
    async postPracticalReport(req, res) {
        try {
            if (!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const [specializationStudent, advisor] = await        CursistaEspecializacaoController.getEntities(req.loginUsuario)

            const existinReport = await _relatorio_pratico2.default.findOne({
                where: {
                    nome: req.body.name,
                    login: req.loginUsuario
                }
            })

            if(existinReport){
                return res.status(409).json({
                    error: `${existinReport.nome} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }

            const report = await CursistaEspecializacaoController.createReport(specializationStudent, advisor, req.body)
            
            await _notificacao2.default.create({
                login: advisor.login,
                mensagem: `${req.loginUsuario} ` + _messages_pt2.default.NEW_MATERIAL,
                tipo: _notificationType2.default.PENDENCIA,
                chaveReferenciado: req.body.name,
                modeloReferenciado: _referencedModel2.default.PRACTICAL_REPORT
            })

            return res.status(201).json(report)

        } catch (error) {
            console.log(error)
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }

    }

    async getMyMaterials(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }            

            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const myMaterials = await specializationStudent.getMaterial()

            return res.status(200).json(myMaterials)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotViewedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const materials = await specializationStudent.getMaterial({
                where: {
                    visualizado_pelo_cursista: false
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMaterial(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const [specializationStudent, advisor] = await CursistaEspecializacaoController.getEntities(req.loginUsuario)

            const report = await specializationStudent.getMaterial({
                where: {
                    nome: req.params.nome
                }
            })

            if(!(report[0].dataAvaliacao == null)) {
                report[0].visualizado_pelo_cursista = true
                await report[0].save()
            }

            return res.status(200).json(report)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postCursaTurma(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)
            const classObject = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.params.nome_turma
                }
            })

            if(classObject == null) {
                return res.status(422).json({
                    error: `${req.params.nome_turma} ` + _messages_pt2.default.NOT_FOUND
                })
            }

            if(await specializationStudent.hasTurma(turma)){
                return res.status(422).json({
                    error: `${specializationStudent.login} ` + _messages_pt2.default.ALREADY_IN_CLASS
                })
            }

            await specializationStudent.addTurma(classObject)

            return res.status(201).json(await specializationStudent.getTurma())

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const myClasses = await specializationStudent.getTurma()

            return res.status(200).json(myClasses)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    static async inserirInteresse(discipline, year, specializationStudent){
        try {
            await specializationStudent.createInteresse({
                ano: year,
                nomeDisciplina: discipline.nomeDisciplina,
                preferencia: discipline.preferencia
            })    

            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    static async inserirDisciplinas(data, specializationStudent){
        const disciplines = data.interesse
        const year = data.ano

        const promises = disciplines.map(async (discipline) => {
            try {
                await CursistaEspecializacaoController.inserirInteresse(discipline, year, specializationStudent)
                
                return { status: 'sucesso', disciplina: discipline.nomeDisciplina}
            } catch (error) {
                return { status: 'falho', discipline: discipline.nomeDisciplina, message: error.message.split(":")[0]}
            }
        })
        
        const results = await Promise.allSettled(promises)
        let success = []
        let fail = []
        let unexpectedError = []

        results.forEach((result) => {
            if (result.status === 'fulfilled' && result.value.status === 'sucesso') {
                success.push(`Disciplina ${result.value.discipline} inserida com sucesso.`);
            } else if (result.status === 'fulfilled' && result.value.status === 'falho') {
                if(result.value.message == 'SequelizeUniqueConstraintError') {
                    fail.push(`Erro ao inserir ${result.value.discipline}: Dado duplicado`)
                } else if(result.value.message == 'SequelizeForeignKeyConstraintError') {
                    fail.push(`Erro ao inserir ${result.value.discipline}: Disciplina não encontrada`)
                } else {
                    fail.push(`Erro ao inserir ${result.value.discipline}: ${result.value.message}`)
                }
            } else {
                unexpectedError.push(`Erro inesperado:`, result.reason);
            }
        })

        return { success: success, fail: fail, unexpectedError: unexpectedError}
    }

    async postInteresseNaDisciplina(req, res){
        try {
            if(!(req.tipoUsuario === _userTypes2.default.CURSISTA)){
                return res.status(403).json({
                    error: _messages_pt2.default.ACCESS_DENIED
                })
            }

            const specializationStudent = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)
            const data = req.body

            const status = await CursistaEspecializacaoController.inserirDisciplinas(data, specializationStudent)
            
            if(status.fail.length === 0 && status.unexpectedError.length === 0) {
                return res.status(201).json(status.success)
            }
            return res.status(207).json(status)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new CursistaEspecializacaoController()