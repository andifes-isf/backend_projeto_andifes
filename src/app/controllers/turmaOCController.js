import TurmaOC from "../models/turmaoc";
import Curso from '../models/curso'
import ProfessorIsF from '../models/professorisf'

class turmaOCController {
    async post(req, res) {
        const turmaExistente = await TurmaOC.findOne({
            where: {
                nome: req.body.nome
            }
        })

        if(turmaExistente) {
            return res.status(422).json({
                msg: "Turma da Oferta Coletiva ja cadastrada"
            })
        }

        try {
            const turma = await TurmaOC.create({
                idCurso: req.body.idCurso,
                nVagas: req.body.nVagas,
                nome: req.body.nome,
                nInscritos: req.body.nInscritos,
                nConcluintes: req.body.nConcluintes,
                nReprovados: req.body.nReprovados,
            })

            return res.status(201).json(turma)
        } catch (error) {
            return res.status(422).json(error)   
        }

    }

    async get(_, res) {
        try {
            const turmas = await TurmaOC.findAll({
                include: [
                    {
                        model: Curso,
                        attributes: ['nome', 'idioma', 'categoria', 'nivel', 'cargaHoraria']
                    },
                    {
                        model: ProfessorIsF,
                        attributes: {
                            exclude: ['poca']
                        },
                        through: {
                            attributes: {
                                exclude: ['login', 'idTurma'],
                                include: ['inicio', 'termino']
                            }
                        }
                    }
                ],
                order: [
                    ['idCurso', 'ASC'],
                    ['idTurma', 'ASC']
                ]
            })

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}

export default new turmaOCController()