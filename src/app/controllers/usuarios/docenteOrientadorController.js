import * as Yup from 'yup'

// Models
import DocenteOrientador from '../../models/usuarios/docenteorientador'
import Usuario from '../../models/usuarios/usuario'

// Controllers
import UsuarioController from './usuarioController'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, 'docenteorientador')

            const docenteExistente = await DocenteOrientador.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(docenteExistente) {
                return res.status(409).json({
                    msg: 'Docente Nacional ja cadastrado'
                })
            }
    
            const docente = await DocenteOrientador.create({
                login: req.body.login
            })

            return res.status(201).json(docente)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const docentes = await DocenteOrientador.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(docentes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()