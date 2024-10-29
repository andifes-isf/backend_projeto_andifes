import * as Yup from 'yup'
import MESSAGES from '../../utils/messages/messages_pt'

import DisciplinaEspecializacao from '../../models/curso_especializacao/disciplinaespecializacao'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'
import AlteracaoTurmaEspecializacao from '../../models/curso_especializacao/alteracaoturmaespecializacao'
import MinistranteMinistraTurmaEspecializacao from '../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'
import DocenteMinistrante from '../../models/usuarios/docenteministrante'

class turmaDisciplinaEspecializacaoController {
    
    static async validateData(className, disciplineName, ministerLogin) {
        const existingClass = await TurmaDisciplinaEspecializacao.findOne({
            where: {
                nome: className,
            }
        })

        const existingDiscipline = await DisciplinaEspecializacao.findOne({
            where: {
                nome: disciplineName
            }
        })

        const existingMinister = await DocenteMinistrante.findOne({
            where: {
                login: ministerLogin
            }
        })

        return [
            existingClass !== null,
            existingDiscipline == null,
            existingMinister == null
        ]
    }

    async post(req, res){
        try {

            const className = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

            const [existingClass, existingDiscipline, existingMinister] = await turmaDisciplinaEspecializacaoController.validateData(className, req.body.disciplina, req.body.loginMinistrante)
            
            if(existingClass) {
                return res.status(409).json({
                    error: `${className} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }

            if(existingDiscipline || existingMinister) {
                return res.status(409).json({
                    error: `${req.body.loginMinistrante} ou ${req.body.disciplina} ` + MESSAGES.NOT_FOUND
                })
            }
            
            const classObject = await TurmaDisciplinaEspecializacao.create({
                disciplina: req.body.disciplina,
                edital: req.body.edital,
                nome: req.body.nome,
                mesOferta: req.body.mesOferta,
                numeroVagas: req.body.numeroVagas,
                numeroMinimoAlunos: req.body.numeroMinimoAlunos,
                numeroInscritos: req.body.numeroInscritos,
                numeroAprovados: req.body.numeroAprovados,
                numeroDesistentes: req.body.numeroDesistentes,
                numeroReprovados: req.body.numeroReprovados,
            })	

            const MinistersClass = await MinistranteMinistraTurmaEspecializacao.create({
                nomeTurma: classObject.nome,
                login: req.body.loginMinistrante
            })
            
            return res.status(201).json({
                turma: classObject,
                relacao: relacaoComTurma
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
    
    async get(_, res) {
        try {
            const classes = await TurmaDisciplinaEspecializacao.findAll({
                order: [
                    ['edital', 'DESC']
                ]
            })
            
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getPorAno(req, res) {
        try {
            const classes = await TurmaDisciplinaEspecializacao.findAll({
                where: {
                    edital: req.params.ano
                },
                order: [
                    ['nome', 'ASC']
                ]
            })
            
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new turmaDisciplinaEspecializacaoController()