import { Router } from "express"

////// Importações para as rotas

// Autenticação
import SessionController from '../controllers/authentication/SessionController'

// curso_especializacao
import disciplinaEspecializacaoRoutes from "./curso_especializacao/disciplinaEspecializacaoRoutes"
import editalEspecializacaoRoutes from './curso_especializacao/editalEspecializacaoRoutes'
import OuvidoriaCursoEspecializacaoRoutes from './curso_especializacao/OuvidoraCursoEspecializacaoRoutes'
import turmaDisciplinaEspecializacaoRoutes from './curso_especializacao/turmaDisciplinaEspecializacaoRoutes'

// instituicao  
import instituicaoEnsinoBrasileiraRoutes from './instituicao/instituicaoEnsinoBrasileiraRoutes'
import instituicaoEnsinoEstrangeiraRoutes from './instituicao/instituicaoEnsinoEstrangeiraRoutes'
import instituicaoEnsinoRoutes from './instituicao/instituicaoEnsinoRoutes'

// ofertacoletiva
import alunoIsFParticipaTurmaOCRoutes from "./ofertacoletiva/alunoIsFParticipaTurmaOCRoutes"
import cursoRoutes from './ofertacoletiva/cursoRoutes'
import professorIsFMinistraTurmaOCRoutes from "./ofertacoletiva/professorIsFMinistraTurmaOCRoutes"
import turmaOCRoutes from './ofertacoletiva/turmaOCRoutes'

// usuarios
import alunoDeInstituicaoRoutes from './usuarios/alunoDeInstituicaoRoutes'
import alunoEstrangeiroRoutes from './usuarios/alunoEstrangeiroRoutes'
import alunoGraduacaoRoutes from './usuarios/alunoGraduacaoRoutes'
import alunoIsFRoutes from './usuarios/alunoIsFRoutes'
import coordenadorNacionalIdiomaRoutes from "./usuarios/coordenadorNacionalIdiomaRoutes"
import coordenadorNacionalRoutes from "./usuarios/coordenadorNacionalRoutes"
import cursistaEspecializacaoRoutes from './usuarios/cursistaEspecializacaoRoutes'
import docenteMinistranteRoutes from './usuarios/docenteMinistranteRoutes'
import docenteOrientadorRoutes from './usuarios/docenteOrientadorRoutes'
import professorIsFRoutes from './usuarios/professorIsFRoutes'
import usuarioRoutes from './usuarios/usuarioRoutes'

const router = new Router()

////// Rotas

// authentication
router.post('/login', SessionController.store)

// curso_especializacao
router.use('/disciplina_especializacao', disciplinaEspecializacaoRoutes)
router.use('/edital_especializacao', editalEspecializacaoRoutes)
router.use('/ouvidoria_curso_especializacao', OuvidoriaCursoEspecializacaoRoutes)
router.use('/turma_especializacao', turmaDisciplinaEspecializacaoRoutes)

// instituicao
router.use('/instituicao_ensino_brasileira', instituicaoEnsinoBrasileiraRoutes)
router.use('/instituicao_ensino_estrangeira', instituicaoEnsinoEstrangeiraRoutes)
router.use('/instituicao_ensino', instituicaoEnsinoRoutes)

// ofertacoletiva
router.use('/alunoisf_participa_turmaoc', alunoIsFParticipaTurmaOCRoutes)
router.use('/curso', cursoRoutes)
router.use('/professorisf_ministra_turmaoc', professorIsFMinistraTurmaOCRoutes)
router.use('/turma_oc', turmaOCRoutes)

// usuarios
router.use('/aluno_deinstituicao', alunoDeInstituicaoRoutes)
router.use('/aluno_estrangeiro', alunoEstrangeiroRoutes)
router.use('/aluno_graduacao', alunoGraduacaoRoutes)
router.use('/aluno_isf', alunoIsFRoutes)
router.use('/coordenador_nacional_idioma', coordenadorNacionalIdiomaRoutes)
router.use('/coordenador_nacional', coordenadorNacionalRoutes)
router.use('/cursista_especializacao', cursistaEspecializacaoRoutes)
router.use('/docente_ministrante', docenteMinistranteRoutes)
router.use('/docente_orientador', docenteOrientadorRoutes)
router.use('/professor_isf', professorIsFRoutes)
router.use('/usuario', usuarioRoutes)

export default router