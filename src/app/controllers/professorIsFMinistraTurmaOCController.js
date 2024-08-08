import ProfessorIsFMinistraTurmaOC from "../models/professorisfministraturmaoc"

class ProfessorIsFMinistraTurmaOCController {
    async post(req, res) {
        try {
            
            // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
    
            if(!(req.tipoUsuario === 'professorisf')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
    
            const relacaoExistente = await ProfessorIsFMinistraTurmaOC.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma,
                    inicio: req.body.inicio
                }
            })
    
            if(relacaoExistente) {
                return res.status(409).json({
                    msg: "Relacao ProfessorIsF e TurmaOC ja cadastrada"
                })
            }
                    
            const relacao = await ProfessorIsFMinistraTurmaOC.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino,
            })
            
            return res.status(201).json(relacao)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res) {
        try {
            const relacoes = await ProfessorIsFMinistraTurmaOC.findAll()

            return res.status(200).json(relacoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new ProfessorIsFMinistraTurmaOCController()