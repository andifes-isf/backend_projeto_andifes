import { Router } from "express"

// Autenticação
import SessionController from '../controllers/SessionController'

// Models
import usuarioRoutes from './usuarioRoutes'
import professorIsFRoutes from './professorIsFRoutes'
import instituicaoEnsinoRoutes from './instituicaoEnsinoRoutes'
import cursoRoutes from './cursoRoutes'
import comprovanteAlunoInstituicaoRoutes from './comprovanteAlunoInstituicaoRoutes'
import alunoIsFRoutes from './alunoIsFRoutes'
import alunoDeInstituicaoRoutes from './alunoDeInstituicaoRoutes'
import turmaOCRoutes from './turmaOCRoutes'
import professorIsFMinistraTurmaOCRoutes from "./professorIsFMinistraTurmaOCRoutes"
import alunoIsFParticipaTurmaOCRoutes from "./alunoIsFParticipaTurmaOCRoutes"
import comprovanteProfessorInstituicaoRoutes from "./comprovanteProfessorInstituicaoRoutes"


const router = new Router()

// Rotas de autenticação
router.post('/login', SessionController.store)

// Rotas de uso
router.use('/usuario', usuarioRoutes)
router.use('/professor_isf', professorIsFRoutes)
router.use('/instituicao_ensino', instituicaoEnsinoRoutes)
router.use('/curso', cursoRoutes)
router.use('/comprovante_aluno_instituicao', comprovanteAlunoInstituicaoRoutes)
router.use('/aluno_isf', alunoIsFRoutes)
router.use('/aluno_deinstituicao', alunoDeInstituicaoRoutes)
router.use('/turma_oc', turmaOCRoutes)
router.use('/professorisf_ministra_turmaoc', professorIsFMinistraTurmaOCRoutes)
router.use('/alunoisf_participa_turmaoc', alunoIsFParticipaTurmaOCRoutes)
router.use('/comprovante_professor_instituicao', comprovanteProfessorInstituicaoRoutes)

export default router