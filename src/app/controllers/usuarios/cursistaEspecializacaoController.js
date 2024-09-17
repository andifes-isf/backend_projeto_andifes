import { Sequelize } from "sequelize";

// Models
import CursistaEspecializacao from "../../models/usuarios/cursistaespecializacao";
import MaterialCursista from "../../models/curso_especializacao/materialcursista";
import ProfessorIsF from "../../models/usuarios/professorisf";
import Usuario from "../../models/usuarios/usuario";

// Controllers
import ProfessorIsFController from './professorIsFController'

class CursistaEspecializacaoController {
    async post(req, res) {
        try {    
            await ProfessorIsFController.post(req, res, 1)
            
            const cursistaExistente = await CursistaEspecializacao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(cursistaExistente) {
                return res.status(409).json({
                    msg: "Cursista de especializacao ja cadastrado"
                })
            }
            
            const cursista = await CursistaEspecializacao.create({
                login: req.body.login
            })
    
            return res.status(201).json(cursista)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async get(_, res){
        try {
            const cursistas = await CursistaEspecializacao.findAll({
                include: [
                    {
                        model: ProfessorIsF,
                        attributes: {
                            exclude: ['login'],
                        },
                        include: [{
                            model: Usuario,
                            attributes: {
                                exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
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

    async postMaterial(req, res){
        try {
            console.log(req.tipoUsuario)
            if(!(req.tipoUsuario === 'cursista')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Verifica se o material já existe
            const materialExistente = await MaterialCursista.findOne({
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

            const material = await MaterialCursista.create({
                login: req.loginUsuario,
                idioma: req.body.idioma,
                nome: req.body.nome,
                nivel: req.body.nivel,
                ementa: req.body.ementa,
                cargaHoraria: req.body.cargaHoraria,
            })

            return res.status(201).json(material)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }

    }

    async getMateriais(_, res){
        try {
            const materiais = await MaterialCursista.findAll()

            return res.status(200).json(materiais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMateriaisDoCursista(req, res){
        try {
            // Verifica se o login passado é de um cursista
            const cursista = await CursistaEspecializacao.count({
                where: {
                    login: req.params.login
                }
            })

            if(cursista === 0){
                return res.status(422).json({
                    msg: 'Cursista nao encontrado'
                })
            }


            const materiais = await MaterialCursista.findAll({
                where: {
                    login: req.params.login
                }
            })

            return res.status(200).json(materiais)
        } catch (error) {
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

            const materiais = await MaterialCursista.findAll({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(materiais)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new CursistaEspecializacaoController()