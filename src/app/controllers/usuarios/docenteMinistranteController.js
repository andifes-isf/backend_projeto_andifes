import * as Yup from 'yup'

// Models
import DocenteMinistrante from '../../models/usuarios/docenteministrante'
import Usuario from '../../models/usuarios/usuario'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'

// Controllers
import UsuarioController from './usuarioController'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, 'docenteministrante')

            const docenteExistente = await DocenteMinistrante.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(docenteExistente) {
                return res.status(409).json({
                    msg: 'Docente Ministrante ja cadastrado'
                })
            }
    
            const docente = await DocenteMinistrante.create({
                login: req.body.login
            })

            return res.status(201).json(docente)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const docentes = await DocenteMinistrante.findAll({
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

            return res.status(200).json(docentes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMinhasTurmas(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteministrante')){
                return res.status(403).json({
                    error: "Acesso negado"
                })
            }

            const docente = await DocenteMinistrante.findByPk(req.loginUsuario)

            const turmas = await docente.getTurmaDisciplinaEspecializacaos()

            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()