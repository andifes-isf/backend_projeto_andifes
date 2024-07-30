import Curso from "../models/curso";

class cursoController {
    async post(req, res) {
        const cursoExistente = await Curso.findOne({
            where: {
                nome: req.body.nome
            }
        })

        if(cursoExistente) {
            return res.status(422).json({
                msg: "Curso ja cadastrado"
            })
        }

        const curso = await Curso.create({
            nome: req.body.nome,
            idioma: req.body.idioma,
            categoria: req.body.categoria,
            nivel: req.body.nivel,
            cargaHoraria: req.body.cargaHoraria,
            ementa: req.body.ementa,
            justificativa: req.body.justificativa,
            objetivos: req.body.objetivos,
            metodologia: req.body.metodologia,
            descricaoAvaliacao: req.body.descricaoAvaliacao,
            aspectosFuncionais: req.body.aspectosFuncionais,
            aspectosInterculturais: req.body.aspectosInterculturais,
            aspectosLinguisticos: req.body.aspectosLinguisticos
        })

        return res.status(201).json(curso)
    }

    async get(_, res) {
        try {
            const cursos = await Curso.findAll()

            return res.status(200).json(cursos)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

export default new cursoController()