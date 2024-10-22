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

    static async pegarEntidades(login){
        const cursista = await CursistaEspecializacao.findByPk(login)
        const orientador = await cursista.getOrientador({
            through: {
                where: {
                    status: "ativo"
                }
            }
        })

        console.log(orientador)

        return [ cursista, orientador[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static async createReport(cursista, orientador, material){
        const { idioma, nome, nivel, descricao, cargaHoraria, link_portfolio, categoria } = material

        await cursista.createMaterial({
            idioma: idioma,
            nome: nome,
            nivel: nivel,
            descricao: descricao,
            cargaHoraria: cargaHoraria,
            orientador: orientadorlogin,
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

            const [cursista, orientador] = await        CursistaEspecializacaoController.pegarEntidades(req.loginUsuario)

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

            const relatorio = await CursistaEspecializacaoController.createReport(cursista, orientador, req.body)
            
            await Notificacao.create({
                login: orientador.login,
                mensagem: `${req.loginUsuario} postou um material novo`,
                tipo: 'pendencia',
                chaveReferenciado: req.body.nome,
                modeloReferenciado: 'materialcursista'
            })

            return res.status(201).json(await cursista.getMaterial())

        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    // async getMeusMateriais(req, res){
    //     try {
    //         if(!(req.tipoUsuario === UserTypes.CURSISTA)){
    //             return res.status(403).json({
    //                 error: 'Acesso negado'
    //             })
    //         }            

    //         const cursista = await CursistaEspecializacao.findByPk(req.loginUsuario)

    //         const meusMateriais = await cursista.getValidacaoMaterial()

    //         return res.status(200).json(meusMateriais)
    //     } catch (error) {
    //         return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
    //     }
    // }

    // async getMaterialNaoVisualizado(req, res){
    //     try {
    //         if(!(req.tipoUsuario === UserTypes.CURSISTA)){
    //             return res.status(403).json({
    //                 error: 'Acesso negado'
    //             })
    //         }

    //         // Pegando instância do cursista
    //         const cursista = await CursistaEspecializacao.findByPk(req.loginUsuario)

    //         const materiais = await cursista.getMaterial({
    //             through: {
    //                 where: {
    //                     visualizado_pelo_cursista: false
    //                 }
    //             }
    //         })

    //         return res.status(200).json(materiais)

    //     } catch (error) {
    //         return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
    //     }
    // }

    // async getMaterial(req, res){
    //     try {
    //         if(!(req.tipoUsuario === UserTypes.CURSISTA)){
    //             return res.status(403).json({
    //                 error: 'Acesso negado'
    //             })
    //         }

    //         // Pegando instância do cursista
    //         const [cursista, orientador] = await CursistaEspecializacaoController.pegarEntidades(req.loginUsuario)

    //         // Pegando instância do material
    //         const material = await cursista.getMaterial({
    //             where: {
    //                 nome: req.params.nome
    //             }
    //         })

    //         validacao.visualizadoPeloCursistaAposAnalise = true
    //         await validacao.save()

    //         return res.status(200).json(material)

    //     } catch (error) {
    //         return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
    //     }
    // }

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