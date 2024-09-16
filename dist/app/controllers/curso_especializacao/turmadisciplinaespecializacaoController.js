"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);

class turmaDisciplinaEspecializacaoController {
    async post(req, res){
        try {
            const turmaExistente = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.body.nome,
                }
            })
    
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma ja cadastrada no sistema"
                })
            }

            const turma = await _turmadisciplinaespecializacao2.default.create({
                disciplina: req.body.disciplina,
                nome: req.body.nome,
                mesOferta: req.body.mesOferta,
                numeroVagas: req.body.numeroVagas,
                numeroMinimoAlunos: req.body.numeroMinimoAlunos,
                numeroInscritos: req.body.numeroInscritos,
                numeroAprovados: req.body.numeroAprovados,
                numeroDesistentes: req.body.numeroDesistentes,
                numeroReprovados: req.body.numeroReprovados,
            })	
    
            return res.status(201).json(turma)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const turmas = await _turmadisciplinaespecializacao2.default.findAll()

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async updateData(req, res){
        try {
            // Buscando registro no banco de dados
            const turma = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.params.nome
                }
            })

            if(!turma){
                return res.status(404).json({
                    error: "Turma nao encontrada"
                })
            }

            // Atualizando o registro
            const numeroVagas = req.body.numeroVagas
            const numeroMinimoAlunos = req.body.numeroMinimoAlunos
            
            turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
            turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

            await turma.save()

            return res.status(201).json(turma)
        } catch (error) {
            console.log(error)
        }
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()