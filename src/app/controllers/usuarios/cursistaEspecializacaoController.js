import { Sequelize } from "sequelize";

// Models
import CursistaCursaTurmaEspecializacao from "../../models/curso_especializacao/cursistacursaturmaespecializacao";
import CursistaEspecializacao from "../../models/usuarios/cursistaespecializacao";
import InteresseNaDisciplina from '../../models/curso_especializacao/InteresseNaDisciplina'
import RelatorioPratico from "../../models/curso_especializacao/relatorio_pratico";
import Notificacoes from '../../models/utils/notificacao'
import ProfessorIsF from "../../models/usuarios/professorisf";
import Usuario from "../../models/usuarios/usuario";
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'

// Controllers
import ProfessorIsFController from './professorIsFController'
import DocenteOrientador from "../../models/usuarios/docenteorientador";
import Notificacao from "../../models/utils/notificacao";

// Utils
import notificationType from '../../utils/notificationType/notificationType'
import LanguageFactory from "../../utils/languages/languageFactory";
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/messages/messages_pt'
import ReferencedModel from "../../utils/referencedModel/referencedModel";
import CustomError from "../../utils/response/CustomError/CustomError";
import ErrorType from "../../utils/response/ErrorType/ErrorType";
import httpStatus from "../../utils/response/httpStatus/httpStatus";

class CursistaEspecializacaoController {
    static async verifyExistingSpecializationStudent(login) {
        const existingSpecializationStudent = await CursistaEspecializacao.findOne({
            where: {
                login: login
            }
        })

        if(existingSpecializationStudent) {
            return new CustomError(
                `${existingSpecializationStudent.login}` + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingSpecializationStudent = await CursistaEspecializacaoController.verifyExistingSpecializationStudent(req.body.login)
        
        if (existingSpecializationStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingSpecializationStudent.message,
                errorName: existingSpecializationStudent.name
            })
        }
        
        const { error, teacher } = await ProfessorIsFController.post(req, res, 1)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: teacher.message,
                errorName: teacher.name
            })
        }
        
        const specializationStudent = await CursistaEspecializacao.create({
            login: req.body.login
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            teacher
        })
    }

    async get(_, res){
        try {
            const specializationStudents = await CursistaEspecializacao.findAll({
                include: [
                    {
                        model: ProfessorIsF,
                        attributes: {
                            exclude: ['login'],
                        },
                        include: [{
                            model: Usuario,
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
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    static async getEntities(login){
        const specializationStudent = await CursistaEspecializacao.findByPk(login)
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
        return LanguageFactory.getLanguage(language)
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
            if (!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const [specializationStudent, advisor] = await        CursistaEspecializacaoController.getEntities(req.loginUsuario)

            const existinReport = await RelatorioPratico.findOne({
                where: {
                    nome: req.body.name,
                    login: req.loginUsuario
                }
            })

            if(existinReport){
                return res.status(409).json({
                    error: `${existinReport.nome} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }

            const report = await CursistaEspecializacaoController.createReport(specializationStudent, advisor, req.body)
            
            await Notificacao.create({
                login: advisor.login,
                mensagem: `${req.loginUsuario} ` + MESSAGES.NEW_MATERIAL,
                tipo: notificationType.PENDENCIA,
                chaveReferenciado: req.body.name,
                modeloReferenciado: ReferencedModel.PRACTICAL_REPORT
            })

            return res.status(201).json(report)

        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    async getMyMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }            

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)

            const myMaterials = await specializationStudent.getMaterial()

            return res.status(200).json(myMaterials)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotViewedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)

            const materials = await specializationStudent.getMaterial({
                where: {
                    visualizado_pelo_cursista: false
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMaterial(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
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
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postCursaTurma(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)
            const classObject = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: req.params.nome_turma
                }
            })

            if(classObject == null) {
                return res.status(422).json({
                    error: `${req.params.nome_turma} ` + MESSAGES.NOT_FOUND
                })
            }

            if(await specializationStudent.hasTurma(turma)){
                return res.status(422).json({
                    error: `${specializationStudent.login} ` + MESSAGES.ALREADY_IN_CLASS
                })
            }

            await specializationStudent.addTurma(classObject)

            return res.status(201).json(await specializationStudent.getTurma())

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)

            const myClasses = await specializationStudent.getTurma()

            return res.status(200).json(myClasses)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
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
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)
            const data = req.body

            const status = await CursistaEspecializacaoController.inserirDisciplinas(data, specializationStudent)
            
            if(status.fail.length === 0 && status.unexpectedError.length === 0) {
                return res.status(201).json(status.success)
            }
            return res.status(207).json(status)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new CursistaEspecializacaoController()