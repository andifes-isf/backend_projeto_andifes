import * as Yup from 'yup'

// Models
import CoordenadorNacional from '../../models/usuarios/coordenadornacional'
import EditalCursoEspecializacao from '../../models/curso_especializacao/editalcursoespecializacao'
import Usuario from '../../models/usuarios/usuario'

// Controllers
import usuarioController from "../../user/usuarioController"

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'

class coordenadorNacionalController {
    async post(req, res) {
        try {            
            await usuarioController.post(req, res, UserTypes.NATIONAL_COORDINATOR)

            const existingCoordinator = await CoordenadorNacional.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingCoordinator) {
                return res.status(409).json({
                    error: `${existingCoordinator.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const coordenador = await CoordenadorNacional.create({
                login: req.body.login,
            })

            return res.status(201).json(coordenador)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)           
        }
    }

    async get(_, res){
        try {
            const coordinators = await CoordenadorNacional.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(coordinators)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postEdital(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.NATIONAL_COORDINATOR)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const existingEdital = await EditalCursoEspecializacao.findOne({
                where: {
                    ano: req.body.ano
                }
            })

            if(existingEdital) {
                return res.status(409).json({
                    error: `Edital de ${req.body.ano} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }

            const edital = await EditalCursoEspecializacao.create({
                ano: req.body.ano,
                documento: req.body.documento,
                link: req.body.link,
                criador: req.loginUsuario
            })

            return res.status(201).json(edital)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new coordenadorNacionalController()