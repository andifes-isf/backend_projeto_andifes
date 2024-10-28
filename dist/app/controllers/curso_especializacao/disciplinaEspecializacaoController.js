"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _disciplinaespecializacao = require('../../models/curso_especializacao/disciplinaespecializacao'); var _disciplinaespecializacao2 = _interopRequireDefault(_disciplinaespecializacao);
var _messages_pt = require('../../utils/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

class disciplinaEspecializacaoController {
    async post(req, res){
        try {
            const disciplinaExistente = await _disciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(disciplinaExistente) {
                return res.status(409).json({
                    msg: `${disciplinaExistente.nome} ` + _messages_pt2.default.ALREADY_IN_SYSTEM
                })
            }

            const disciplina = await _disciplinaespecializacao2.default.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                eixoTematico: req.body.eixoTematico,
                categoria: req.body.categoria
            })	
    
            return res.status(201).json(disciplina)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async get(_, res) {
        try {
            const disciplinas = await _disciplinaespecializacao2.default.findAll()

            return res.status(200).json(disciplinas)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new disciplinaEspecializacaoController()