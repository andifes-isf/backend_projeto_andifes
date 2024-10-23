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
import UserTypes from '../../utils/userType/userTypes'

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await ProfessorIsFController.post(req, res, 1)
            
            const cursistaExistente = await CursistaEspecializacao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(cursistaExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await CursistaEspecializacao.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const cursistas = await CursistaEspecializacao.findAll({
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

            return res.status(200).json(cursistas)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    static async getEntities(login){
        const cursista = await CursistaEspecializacao.findByPk(login)
        const orientador = await cursista.getOrientador({
            through: {
                where: {
                    status: "ativo"
                }
            }
        })

        return [ cursista, orientador[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static async createReport(cursista, orientador, material){
        const { idioma, nome, nivel, descricao, cargaHoraria, link_portfolio, categoria } = material

        return await cursista.createMaterial({
            idioma: idioma,
            nome: nome,
            nivel: nivel,
            descricao: descricao,
            cargaHoraria: cargaHoraria,
            orientador: orientador.login,
            link_portfolio: link_portfolio,
            categoria: categoria,
        })
    }
    
    async postPracticalReport(req, res) {
        try {
            if (!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const [cursista, orientador] = await        CursistaEspecializacaoController.getEntities(req.loginUsuario)

            const relatorioExistente = await RelatorioPratico.findOne({
                where: {
                    nome: req.body.nome,
                    login: req.loginUsuario
                }
            })

            if(relatorioExistente){
                return res.status(409).json({
                    msg: "Relatorio ja existente"
                })
            }

            const report = await CursistaEspecializacaoController.createReport(cursista, orientador, req.body)
            
            await Notificacao.create({
                login: orientador.login,
                mensagem: `${req.loginUsuario} postou um material novo`,
                tipo: 'pendencia',
                chaveReferenciado: req.body.nome,
                modeloReferenciado: 'materialcursista'
            })

            return res.status(201).json(report)

        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async getMyMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }            

            const specializationStudent = await CursistaEspecializacao.findByPk(req.loginUsuario)

            const myMaterials = await specializationStudent.getMaterial()

            return res.status(200).json(myMaterials)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getNotViewedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
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
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMaterial(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
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
                console.log('entrou aqui')
            }

            return res.status(200).json(report)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async postCursaTurma(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const cursista = await CursistaEspecializacao.findByPk(req.loginUsuario)
            const turma = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: req.params.nome_turma
                }
            })

            // Verifica se o cursista já está inserido na turma
            if(await cursista.hasTurma(turma)){
                return res.status(422).json('Cursista ja esta inscrito nessa turma')
            }

            await cursista.addTurma(turma)

            return res.status(201).json(await cursista.getTurma())

        } catch (error) {
            if(error instanceof SequelizeUniqueConstraintError){
                return res.status(422).json('Cursista ja esta inscrito nessa turma')
            }

            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.CURSISTA)){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const cursista = await CursistaEspecializacao.findByPk(req.loginUsuario)

            const minhasTurmas = await cursista.getTurma()

            return res.status(200).json(minhasTurmas)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    static async inserirInteresse(disciplina, ano, cursista){
        try {
            await cursista.createInteresse({
                ano: ano,
                nomeDisciplina: disciplina.nomeDisciplina,
                preferencia: disciplina.preferencia
            })    

            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    static async inserirDisciplinas(dados, cursista){
        const disciplinas = dados.interesse
        const ano = dados.ano

        const promessas = disciplinas.map(async (disciplina) => {
            try {
                await CursistaEspecializacaoController.inserirInteresse(disciplina, ano, cursista)
                
                return { status: 'sucesso', disciplina: disciplina.nomeDisciplina}
            } catch (error) {
                return { status: 'falho', disciplina: disciplina.nomeDisciplina, message: error.message}
            }
        })
        
        const resultados = await Promise.allSettled(promessas)
        let sucesso = []
        let falha = []
        let erroInesperado = []

        resultados.forEach((resultado) => {
            if (resultado.status === 'fulfilled' && resultado.value.status === 'sucesso') {
                sucesso.push(`Disciplina ${resultado.value.disciplina} inserida com sucesso.`);
            } else if (resultado.status === 'fulfilled' && resultado.value.status === 'falho') {
                falha.push(`Erro ao inserir disciplina ${resultado.value.disciplina}: ${resultado.value.message}`);
            } else {
                erroInesperado.push(`Erro inesperado:`, resultado.reason);
            }
        })

        return { sucesso: sucesso, falha: falha, erroInesperado: erroInesperado}
    }

    async postInteresseNaDisciplina(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const cursista = await CursistaEspecializacao.findByPk(req.loginUsuario)
            const dados = req.body

            const status = await CursistaEspecializacaoController.inserirDisciplinas(dados, cursista)
            
            if(status.falha.length === 0 && status.erroInesperado.length === 0) {
                return res.status(201).json(status.sucesso)
            }
            return res.status(207).json(status)
        } catch (error) {
            return res.status(500)
        }
    }
}

export default new CursistaEspecializacaoController()