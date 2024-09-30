import * as Yup from 'yup'

// Models
import CursistaEspecializacao from '../../models/usuarios/cursistaespecializacao'
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
                    msg: 'Docente Orientador ja cadastrado'
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
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(docentes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async postOrientado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando as instâncias
            const orientador = await DocenteOrientador.findByPk(req.loginUsuario)
            const cursista = await CursistaEspecializacao.findByPk(req.body.loginCursista)
            if(existente){
                return res.status(422).json({
                    error: "Esse orientador ja orienta esse cursista"
                })
            }

            // Verificando se esse orientado já orienta esse cursista
            const existente = await orientador.hasOrientado(cursista)
            if(existente){
                return res.status(422).json({
                    error: "Esse orientador ja orienta esse cursista"
                })
            }

            // Relacionando os dois
            await orientador.addOrientado(cursista)

            return res.status(200).json(await orientador.getOrientado())

        } catch (error) {
            console.log(error)
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()