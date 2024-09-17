import * as Yup from 'yup'

// Models
import CoordenadorNacionalIdioma from '../../models/usuarios/coordenadornacionalIdioma'
import Usuario from '../../models/usuarios/usuario'

// Controllers
import UsuarioController from './usuarioController'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, 'coordenadornacionalidioma')

            const coordenadorExistente = await CoordenadorNacionalIdioma.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(coordenadorExistente) {
                return res.status(409).json({
                    msg: 'Coordenador Nacional ja cadastrado'
                })
            }
    
            const coordenador = await CoordenadorNacionalIdioma.create({
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
            const coordenadores = await CoordenadorNacionalIdioma.findAll({
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

export default new coordenadorNacionalIdiomaController()