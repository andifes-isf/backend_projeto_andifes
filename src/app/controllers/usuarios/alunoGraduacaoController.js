import { Sequelize } from "sequelize";
import AlunoGraduacao from "../../models/usuarios/alunograduacao";
import Usuario from "../../models/usuarios/usuario";
import ProfessorIsF from "../../models/usuarios/professorisf";
import ProfessorIsFController from './professorIsFController'
import MESSAGES from "../../utils/messages/messages_pt";

class AlunoGraduacaoController {
    async post(req, res) {
        try {    
            await ProfessorIsFController.post(req, res, 0)
            
            const existingGraduationStudent = await AlunoGraduacao.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingGraduationStudent) {
                return res.status(409).json({
                    error: `${existingGraduationStudent.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
            
            const graduationStudent = await AlunoGraduacao.create({
                login: req.body.login
            })
    
            return res.status(201).json(graduationStudent)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }

    async get(_, res){
        try {
            const graduationStudents = await AlunoGraduacao.findAll({
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
                ],
                logging: console.log
            })
            
            return res.status(200).json(graduationStudents)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }
}

export default new AlunoGraduacaoController()