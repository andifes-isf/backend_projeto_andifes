"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);

class turmaDisciplinaEspecializacaoController {
    async post(req, res){
        try {
            const disciplinaExistente = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.body.nome,
                    idTurma: req.body.idTurma
                }
            })
			console.log("TESTE")
    
            if(disciplinaExistente) {
                return res.status(409).json({
                    msg: "Disciplina ja cadastrada no sistema"
                })
            }

            const disciplina = await _turmadisciplinaespecializacao2.default.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                eixoTematico: req.body.eixoTematico,
                categoria: req.body.categoria
            })	
    
            return res.status(201).json(disciplina)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const disciplinas = await _turmadisciplinaespecializacao2.default.findAll()

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getPerMonth(_, res, categoria) {
        try {
            const disciplinas = await _turmadisciplinaespecializacao2.default.findAll({
                where: {
                    categoria: categoria
                }
            })

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()