import * as Yup from 'yup'

// Models
import DisciplinaEspecializacao from '../../models/curso_especializacao/disciplinaespecializacao'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'
import AlteracaoTurmaEspecializacao from '../../models/curso_especializacao/alteracaoturmaespecializacao'
import MinistranteMinistraTurmaEspecializacao from '../../models/curso_especializacao/ministranteMinistraTurmaEspecializacao'
import DocenteMinistrante from '../../models/usuarios/docenteministrante'

// Utils
import MESSAGES from '../../utils/messages/messages_pt'
import httpStatus from '../../utils/httpStatus/httpStatus'
import { TableHints } from 'sequelize'
import CustomError from '../../utils/CustomError/CustomError'

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
            existingDiscipline !== null,
            existingMinister !== null
        ]
    }

    async post(req, res){
        const className = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

        const [existingClass, existingDiscipline, existingMinister] = await turmaDisciplinaEspecializacaoController.validateData(className, req.body.disciplina, req.body.loginMinistrante)
        
        if(existingClass) {
            throw new CustomError(`${className} ` + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }

        if(!existingDiscipline || !existingMinister) {
            throw new CustomError(`${req.body.loginMinistrante} ou ${req.body.disciplina} ` + MESSAGES.NOT_FOUND, httpStatus.BAD_REQUEST)
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
        
        return res.status(httpStatus.CREATED).json({
            turma: classObject,
            relacao: relacaoComTurma
        })
    }
    
    async get(_, res) {
        const classes = await TurmaDisciplinaEspecializacao.findAll({
            order: [
                ['edital', 'DESC']
            ]
        })
        
        return res.status(httpStatus.SUCCESS).json(classes)
    }

    async getPorAno(req, res) {
        const classes = await TurmaDisciplinaEspecializacao.findAll({
            where: {
                edital: req.params.ano
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        
        return res.status(httpStatus.SUCCESS).json(classes)
    }
}

export default new turmaDisciplinaEspecializacaoController()