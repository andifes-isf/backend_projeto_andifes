import * as Yup from 'yup'

// Models
import CoordenadorNacional from '../../models/usuarios/coordenadornacional'
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
}

export default new coordenadorNacionalController()