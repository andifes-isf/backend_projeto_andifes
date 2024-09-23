"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _alteracaoturmaespecializacao = require('../../models/curso_especializacao/alteracaoturmaespecializacao'); var _alteracaoturmaespecializacao2 = _interopRequireDefault(_alteracaoturmaespecializacao);

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
    
    // Método para verificar se a turma existe
    static async verificaTurmaExistente(nome) {
        return await _turmadisciplinaespecializacao2.default.findOne({ where: { nome } });
    }

    static async verificaModificacaoRealizada(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await _alteracaoturmaespecializacao2.default.findOne({
            order: [
                ['dataModificacao', 'DESC']
            ]
        })
        if (!alteracao || !(alteracao.valorPosteriorNumeroMinimoAlunos === numeroMinimoAlunos && alteracao.valorPosteriorNumeroVagas === numeroVagas))
            return 1
        return 0
    }
    
    static async criaAlteracao(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await _alteracaoturmaespecializacao2.default.create({
            login: login,
            idTurma: turma.idTurma,
            valorAnteriorNumeroVagas: turma.numeroVagas,
            valorPosteriorNumeroVagas: numeroVagas === undefined ? turma.numeroVagas : numeroVagas,
            valorAnteriorNumeroMinimoAlunos: turma.numeroMinimoAlunos,
            valorPosteriorNumeroMinimoAlunos: numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos
        })
    }

    static async atualizaRegistroTurma(turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
        turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

        await turma.save()
    }

    async updateData(req, res){
        try {
            
            // variáveis
            const { nome } = req.params
            const { loginUsuario, tipoUsuario } = req
            
            if(!(req.tipoUsuario) === 'coordenadornacionalidioma'){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
            
            // Buscando registro no banco de dados
            const turma = await turmaDisciplinaEspecializacaoController.verificaTurmaExistente(nome);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }
            
            // console.log(turma)
            // Verificando se a alteração ja foi realizada
            if(!(await turmaDisciplinaEspecializacaoController.verificaModificacaoRealizada(loginUsuario, turma, req.body))){
                return res.status(409).json({
                    error: "Nenhuma alteracao foi realizada"
                })
            }
            
            // Salvando o histórico da atualização            
            await turmaDisciplinaEspecializacaoController.criaAlteracao(loginUsuario, turma, req.body)
            
            // Atualizando o registro
            await turmaDisciplinaEspecializacaoController.atualizaRegistroTurma(turma, req.body)
            
            return res.status(201).json(turma)
        } catch (error) {
            console.log(error)
        }
    }
}

exports. default = new turmaDisciplinaEspecializacaoController()