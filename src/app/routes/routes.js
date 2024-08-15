import { Router } from "express"

// Autenticação
import SessionController from '../controllers/SessionController'

// Models
import usuarioRoutes from './usuarioRoutes'
import professorIsFRoutes from './professorIsFRoutes'
import instituicaoEnsinoRoutes from './instituicaoEnsinoRoutes'
import instituicaoEnsinoBrasileiraRoutes from './instituicaoEnsinoBrasileiraRoutes'
import cursoRoutes from './cursoRoutes'
import comprovanteAlunoInstituicaoRoutes from './comprovanteAlunoInstituicaoRoutes'
import alunoIsFRoutes from './alunoIsFRoutes'
import alunoDeInstituicaoRoutes from './alunoDeInstituicaoRoutes'
import turmaOCRoutes from './turmaOCRoutes'
import professorIsFMinistraTurmaOCRoutes from "./professorIsFMinistraTurmaOCRoutes"
import alunoIsFParticipaTurmaOCRoutes from "./alunoIsFParticipaTurmaOCRoutes"
import comprovanteProfessorInstituicaoRoutes from "./comprovanteProfessorInstituicaoRoutes"
import proeficienciaAlunoIsFRoutes from "./proeficienciaAlunoIsFRoutes"
import proeficienciaProfessorIsFRoutes from "./proeficienciaProfessorIsFRoutes"
import alunoEstrangeiroRoutes from './alunoEstrangeiroRoutes'

const router = new Router()

// Rotas de autenticação
router.post('/login', SessionController.store)

// Rotas de uso
router.use('/usuario', usuarioRoutes)

// Rotas de alunos
router.use('/aluno_isf', alunoIsFRoutes)
router.use('/aluno_estrangeiro', alunoEstrangeiroRoutes)
router.use('/aluno_deinstituicao', alunoDeInstituicaoRoutes)
router.use('/comprovante_aluno_instituicao', comprovanteAlunoInstituicaoRoutes)
router.use('/alunoisf_participa_turmaoc', alunoIsFParticipaTurmaOCRoutes)
router.use('/proeficiencia_alunoisf', proeficienciaAlunoIsFRoutes)

// Rotas de professor
router.use('/professor_isf', professorIsFRoutes)
router.use('/professorisf_ministra_turmaoc', professorIsFMinistraTurmaOCRoutes)
router.use('/comprovante_professor_instituicao', comprovanteProfessorInstituicaoRoutes)
router.use('/proeficiencia_professorisf', proeficienciaProfessorIsFRoutes)

// Rotas de Instituições
router.use('/instituicao_ensino', instituicaoEnsinoRoutes)
router.use('/instituicao_ensino_brasileira', instituicaoEnsinoBrasileiraRoutes)

// Curso Oferta Coletiva
router.use('/curso', cursoRoutes)
router.use('/turma_oc', turmaOCRoutes)

export default router