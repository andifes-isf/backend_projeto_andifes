import { Router } from "express"

// Autenticação
import SessionController from '../controllers/authentication/SessionController'

////// Rotas

// instituicao  
import instituicaoEnsinoBrasileiraRoutes from './instituicaoEnsinoBrasileiraRoutes'
import instituicaoEnsinoEstrangeiraRoutes from './instituicaoEnsinoEstrangeiraRoutes'
import instituicaoEnsinoRoutes from './instituicaoEnsinoRoutes'

// ofertacoletiva
import alunoIsFParticipaTurmaOCRoutes from "./alunoIsFParticipaTurmaOCRoutes"
import cursoRoutes from './cursoRoutes'
import professorIsFMinistraTurmaOCRoutes from "./professorIsFMinistraTurmaOCRoutes"
import turmaOCRoutes from './turmaOCRoutes'

// proeficiencia
import proeficienciaAlunoIsFRoutes from "./proeficienciaAlunoIsFRoutes"
import proeficienciaProfessorIsFRoutes from "./proeficienciaProfessorIsFRoutes"

// usuario_pertence_instituicao
import comprovanteAlunoInstituicaoRoutes from './comprovanteAlunoInstituicaoRoutes'
import comprovanteProfessorInstituicaoRoutes from "./comprovanteProfessorInstituicaoRoutes"

// usuarios
import alunoDeInstituicaoRoutes from './alunoDeInstituicaoRoutes'
import alunoEstrangeiroRoutes from './alunoEstrangeiroRoutes'
import alunoGraduacaoRoutes from './alunoGraduacaoRoutes'
import alunoIsFRoutes from './alunoIsFRoutes'
import cursistaEspecializacaoRoutes from './cursistaEspecializacaoRoutes'
import professorIsFRoutes from './professorIsFRoutes'
import usuarioRoutes from './usuarioRoutes'

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
router.use('/cursista_especializacao', cursistaEspecializacaoRoutes)
router.use('/aluno_graduacao', alunoGraduacaoRoutes)
router.use('/professorisf_ministra_turmaoc', professorIsFMinistraTurmaOCRoutes)
router.use('/comprovante_professor_instituicao', comprovanteProfessorInstituicaoRoutes)
router.use('/proeficiencia_professorisf', proeficienciaProfessorIsFRoutes)

// Rotas de Instituições
router.use('/instituicao_ensino', instituicaoEnsinoRoutes)
router.use('/instituicao_ensino_brasileira', instituicaoEnsinoBrasileiraRoutes)
router.use('/instituicao_ensino_estrangeira', instituicaoEnsinoEstrangeiraRoutes)

// Curso Oferta Coletiva
router.use('/curso', cursoRoutes)
router.use('/turma_oc', turmaOCRoutes)

export default router