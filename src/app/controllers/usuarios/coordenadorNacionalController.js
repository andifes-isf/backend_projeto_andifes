import * as Yup from 'yup'

// Models
import CoordenadorNacional from '../../models/usuarios/coordenadornacional'
import EditalCursoEspecializacao from '../../models/curso_especializacao/editalcursoespecializacao'
import Usuario from '../../models/usuarios/usuario'

// Controllers
import usuarioController from './usuarioController'

class coordenadorNacionalController {
    async post(req, res) {
        try {            
            await usuarioController.post(req, res, 'coordenadornacional')

            const coordenadorExistente = await CoordenadorNacional.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(coordenadorExistente) {
                return res.status(409).json({
                    msg: 'Coordenador Nacional ja cadastrado'
                })
            }
    
            const coordenador = await CoordenadorNacional.create({
                login: req.body.login,
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const coordenadores = await CoordenadorNacional.findAll({
                include: [
                    {
                        model: Usuario,
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

    async postEdital(req, res){
        try {
            // Verifica se o usuario logado é um coordenador nacional
            if(!(req.tipoUsuario === 'coordenadornacional')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Verifica se já existe
            const editalExistente = await EditalCursoEspecializacao.findOne({
                where: {
                    ano: req.body.ano
                }
            })

            if(editalExistente) {
                return res.status(409).json({
                    error: `Edital de ${req.body.ano} ja cadastrado`
                })
            }

            // Cria edital
            const edital = await EditalCursoEspecializacao.create({
                ano: req.body.ano,
                documento: req.body.documento,
                link: req.body.link,
                criador: req.loginUsuario
            })

            return res.status(201).json(edital)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new coordenadorNacionalController()