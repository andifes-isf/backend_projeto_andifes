"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

// Models
var _coordenadornacionalIdioma = require('../../models/usuarios/coordenadornacionalIdioma'); var _coordenadornacionalIdioma2 = _interopRequireDefault(_coordenadornacionalIdioma);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Controllers
var _usuarioController = require('./usuarioController'); var _usuarioController2 = _interopRequireDefault(_usuarioController);

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await _usuarioController2.default.post(req, res, 'coordenadornacionalidioma')

            const coordenadorExistente = await _coordenadornacionalIdioma2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(coordenadorExistente) {
                return res.status(409).json({
                    msg: 'Coordenador Nacional ja cadastrado'
                })
            }
    
            const coordenador = await _coordenadornacionalIdioma2.default.create({
                login: req.body.login,
                idioma: req.body.idioma
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const coordenadores = await _coordenadornacionalIdioma2.default.findAll({
                include: [
                    {
                        model: _usuario2.default,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(coordenadores)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    // Método para verificar se a turma existe
    static async verificaTurmaExistente(nome) {
        return await TurmaDisciplinaEspecializacao.findOne({ where: { nome } });
    }

    static async verificaModificacaoRealizada(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await AlteracaoTurmaEspecializacao.findOne({
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

        const alteracao = await AlteracaoTurmaEspecializacao.create({
            login: login,
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

exports. default = new coordenadorNacionalIdiomaController()