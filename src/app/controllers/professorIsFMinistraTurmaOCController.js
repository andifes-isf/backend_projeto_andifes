import ProfessorIsFMinistraTurmaOC from "../models/professorisfministraturmaoc"

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        const relacaoExistente = await ProfessorIsFMinistraTurmaOC.findOne()

        if(relacaoExistente) {
            return res.status(422).json({
                msg: "Relacao ProfessorIsF e TurmaOC ja cadastrada"
            })
        }

        try {
            const relacao = await ProfessorIsFMinistraTurmaOC.create({
                login: req.body.login,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino,
            })
            
            return res.status(201).json(relacao)
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    async get(_, res) {
        try {
            const relacoes = await ProfessorIsFMinistraTurmaOC.findAll()

            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

export default new ProfessorIsFMinistraTurmaOCController()