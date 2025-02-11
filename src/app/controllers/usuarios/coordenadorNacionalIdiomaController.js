import * as Yup from 'yup'

// Models
import CoordenadorNacionalIdioma from '../../models/usuarios/coordenadornacionalIdioma'
import Usuario from '../../models/usuarios/usuario'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'
import AlteracaoTurmaEspecializacao from '../../models/curso_especializacao/alteracaoturmaespecializacao'

// Controllers
// import usuarioController from "../../user/usuarioController"

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, UserTypes.LANGUAGE_NATIONAL_COORDINATOR)

            const existingCoordinator = await CoordenadorNacionalIdioma.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingCoordinator) {
                return res.status(409).json({
                    error: `${existingCoordinator.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const coordinator = await CoordenadorNacionalIdioma.create({
                login: req.body.login,
                idioma: req.body.idioma
            })

            return res.status(201).json(coordinator)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)      
        }
    }

    async get(_, res){
        try {
            const coordinators = await CoordenadorNacionalIdioma.findAll({
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

    static async verifyExistingClass(nome) {
        return await TurmaDisciplinaEspecializacao.findOne({ 
            where: { nome } 
        })
    }

    static async isChanged(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await AlteracaoTurmaEspecializacao.findOne({
            order: [
                ['dataModificacao', 'DESC']
            ]
        })
        if (!alteracao || !(alteracao.valorPosteriorNumeroMinimoAlunos === numeroMinimoAlunos && alteracao.valorPosteriorNumeroVagas === numeroVagas))
            return 1
        return 0
    }
    
    static async change(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await AlteracaoTurmaEspecializacao.create({
            login: login,
            nomeTurma: turma.nome,
            valorAnteriorNumeroVagas: turma.numeroVagas,
            valorPosteriorNumeroVagas: numeroVagas === undefined ? turma.numeroVagas : numeroVagas,
            valorAnteriorNumeroMinimoAlunos: turma.numeroMinimoAlunos,
            valorPosteriorNumeroMinimoAlunos: numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos
        })
    }

    static async updateClassRegister(turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
        turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

        await turma.save()
    }
    
    async updateData(req, res){
        try {
            
            const { nome } = req.params
            const { loginUsuario, tipoUsuario } = req
            
            if(!(req.tipoUsuario) === UserTypes.LANGUAGE_NATIONAL_COORDINATOR){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }
            
            const existingClass = await coordenadorNacionalIdiomaController.verifyExistingClass(nome);
            
            if (!existingClass) {
                return res.status(404).json({
                    error: `${nome} ` + MESSAGES.NOT_FOUND 
                })
            }
            
            if(!(await coordenadorNacionalIdiomaController.isChanged(loginUsuario, existingClass, req.body))) {
                return res.status(409).json({
                    error: MESSAGES.ANY_CHANGE
                })
            }
            
            console.log("TESTE")
            await coordenadorNacionalIdiomaController.change(loginUsuario, existingClass, req.body)
            
            await coordenadorNacionalIdiomaController.updateClassRegister(existingClass, req.body)
            
            return res.status(201).json(existingClass)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)  
        }
    }
}

export default new coordenadorNacionalIdiomaController()