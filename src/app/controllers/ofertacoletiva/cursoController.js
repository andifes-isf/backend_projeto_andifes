// Models
import Curso from "../../models/ofertacoletiva/curso";

// Utils
import httpStatus from "../../utils/response/httpStatus/httpStatus";
import MESSAGES from "../../utils/response/messages/messages_pt";
import CustomError from "../../utils/response/CustomError/CustomError";

class cursoController {
    static async verifyExistingCourse(name) {
        const existingCourse = await Curso.findOne({
            where: {
                nome: name
            }
        })

        if(existingCourse) {
            throw new CustomError(name + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }
    }

    async post(req, res) {
        await cursoController.verifyExistingCourse(req.body.nome)

        const course = await Curso.create({
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

        return res.status(httpStatus.CREATED).json(course)
    }

    async get(_, res) {
        const courses = await Curso.findAll()

        return res.status(httpStatus.SUCCESS).json(courses)
    }
}

export default new cursoController()