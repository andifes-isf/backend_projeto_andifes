"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _curso = require('../../models/ofertacoletiva/curso'); var _curso2 = _interopRequireDefault(_curso);

class cursoController {
    async post(req, res) {
        try {
            const cursoExistente = await _curso2.default.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(cursoExistente) {
                return res.status(409).json({
                    msg: "Curso ja cadastrado"
                })
            }
    
            const curso = await _curso2.default.create({
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
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const cursos = await _curso2.default.findAll()

            return res.status(200).json(cursos)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)    
        }
    }
}

exports. default = new cursoController()