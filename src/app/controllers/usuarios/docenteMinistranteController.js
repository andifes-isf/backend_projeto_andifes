import * as Yup from 'yup'

// Models
import DocenteMinistrante from '../../models/usuarios/docenteministrante'
import Usuario from '../../models/usuarios/usuario'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'

// Controllers
import UsuarioController from './usuarioController'

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, UserTypes.MINISTER_TEACHER)

            const existingTeacher = await DocenteMinistrante.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingTeacher) {
                return res.status(409).json({
                    error: `${existingTeacher.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const teacher = await DocenteMinistrante.create({
                login: req.body.login
            })

            return res.status(201).json(teacher)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)            
        }
    }

    async get(_, res){
        try {
            const teachers = await DocenteMinistrante.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    },
                    {
                        model: TurmaDisciplinaEspecializacao,
                        attributes: {
                            include: ['nome']
                        },
                        through: {
                            attributes: {
                                include: ['login', 'nomeTurma']
                            }
                        }
                    }
                ]
            })

            return res.status(200).json(teachers)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.MINISTER_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const teacher = await DocenteMinistrante.findByPk(req.loginUsuario)

            const classes = await teacher.getTurmaDisciplinaEspecializacaos()

            return res.status(200).json(classes)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()