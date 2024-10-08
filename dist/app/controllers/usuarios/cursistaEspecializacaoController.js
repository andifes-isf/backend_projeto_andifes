"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

// Models
var _cursistacursaturmaespecializacao = require('../../models/curso_especializacao/cursistacursaturmaespecializacao'); var _cursistacursaturmaespecializacao2 = _interopRequireDefault(_cursistacursaturmaespecializacao);
var _cursistaespecializacao = require('../../models/usuarios/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);
var _materialcursista = require('../../models/curso_especializacao/materialcursista'); var _materialcursista2 = _interopRequireDefault(_materialcursista);
var _notificacao = require('../../models/utils/notificacao'); var _notificacao2 = _interopRequireDefault(_notificacao);
var _professorisf = require('../../models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);
var _turmadisciplinaespecializacao = require('../../models/curso_especializacao/turmadisciplinaespecializacao'); var _turmadisciplinaespecializacao2 = _interopRequireDefault(_turmadisciplinaespecializacao);
var _ValidacaoMaterial = require('../../models/curso_especializacao/ValidacaoMaterial'); var _ValidacaoMaterial2 = _interopRequireDefault(_ValidacaoMaterial);

// Controllers
var _professorIsFController = require('./professorIsFController'); var _professorIsFController2 = _interopRequireDefault(_professorIsFController);
var _docenteorientador = require('../../models/usuarios/docenteorientador'); var _docenteorientador2 = _interopRequireDefault(_docenteorientador);


class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await _professorIsFController2.default.post(req, res, 1)
            
            const cursistaExistente = await _cursistaespecializacao2.default.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(cursistaExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await _cursistaespecializacao2.default.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const cursistas = await _cursistaespecializacao2.default.findAll({
                include: [
                    {
                        model: _professorisf2.default,
                        attributes: {
                            exclude: ['login'],
                        },
                        include: [{
                            model: _usuario2.default,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo']
                            }
                        }]
                    }
                ]
            })

            return res.status(200).json(cursistas)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    static async pegarEntidades(login){
        const cursista = await _cursistaespecializacao2.default.findByPk(login)
        const orientador = await cursista.getOrientador({
            through: {
                where: {
                    status: "ativo"
                }
            }
        })

        return [ cursista, orientador[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static async criarMaterial(cursista, material){
        const { idioma, nome, nivel, ementa, cargaHoraria } = material

        await cursista.createMaterial({
            idioma: idioma,
            nome: nome,
            nivel: nivel,
            ementa: ementa,
            cargaHoraria: cargaHoraria,
        })
    }
    
    async postMaterial(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const [cursista, orientador] = await CursistaEspecializacaoController.pegarEntidades(req.loginUsuario)

            // Verifica se o material já existe
            const materialExistente = await _materialcursista2.default.findOne({
                where: {
                    nome: req.body.nome,
                    login: req.loginUsuario
                }
            })

            if(materialExistente){
                return res.status(409).json({
                    msg: "Material ja existente"
                })
            }

            // Cria o material

            const material = await CursistaEspecializacaoController.criarMaterial(cursista, req.body)
            
            // Faz o histórico de validação

            const validacao = await _ValidacaoMaterial2.default.create({
                nomeMaterial: req.body.nome,
                loginOrientador: orientador.login,
                loginCursista: cursista.login
            })

            const notificacao = await _notificacao2.default.create({
                login: orientador.login,
                mensagem: `${req.loginUsuario} postou um material novo`,
                tipo: 'pendencia',
                chaveReferenciado: req.body.nome,
                modeloReferenciado: 'materialcursista'
            })

            return res.status(201).json(await cursista.getMaterial())

        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async getMeusMateriais(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }            

            const cursista = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const meusMateriais = await cursista.getValidacaoMaterial()

            return res.status(200).json(meusMateriais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMaterialNaoVisualizado(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do cursista
            const cursista = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const materiais = await cursista.getValidacaoMaterial({
                through: {
                    where: {
                        visualizadoPeloCursistaAposAnalise: false
                    }
                }
            })

            return res.status(200).json(materiais)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMaterial(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do cursista
            const [cursista, orientador] = await CursistaEspecializacaoController.pegarEntidades(req.loginUsuario)

            // Pegando instância do material
            const material = await cursista.getMaterial({
                where: {
                    nome: req.params.nome
                }
            })

            // Pegando instância do relacionamento
            const validacao = await _ValidacaoMaterial2.default.findOne({
                where: {
                    loginCursista: req.loginUsuario,
                    nomeMaterial: req.params.nome,
                    loginOrientador: orientador.login
                }
            })
            validacao.visualizadoPeloCursistaAposAnalise = true
            await validacao.save()

            return res.status(200).json(material)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async postCursaTurma(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const cursista = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)
            const turma = await _turmadisciplinaespecializacao2.default.findOne({
                where: {
                    nome: req.params.nome_turma
                }
            })

            // Verifica se o cursista já está inserido na turma
            if(await cursista.hasTurma(turma)){
                return res.status(422).json('Cursista ja esta inscrito nessa turma')
            }

            await cursista.addTurma(turma)

            return res.status(201).json(await cursista.getTurma())

        } catch (error) {
            if(error instanceof SequelizeUniqueConstraintError){
                return res.status(422).json('Cursista ja esta inscrito nessa turma')
            }

            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const cursista = await _cursistaespecializacao2.default.findByPk(req.loginUsuario)

            const minhasTurmas = await cursista.getTurma()

            return res.status(200).json(minhasTurmas)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getNotificacoes(req, res){
        try {
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const usuario = await _usuario2.default.findByPk(req.loginUsuario)

            const notificacoes = await usuario.getNotificacaos() 

            return res.status(200).json(notificacoes)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

exports. default = new CursistaEspecializacaoController()