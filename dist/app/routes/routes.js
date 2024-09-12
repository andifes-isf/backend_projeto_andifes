"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

////// Importações para as rotas

// Autenticação
var _SessionController = require('../controllers/authentication/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

// curso_especializacao
var _disciplinaEspecializacaoRoutes = require('./curso_especializacao/disciplinaEspecializacaoRoutes'); var _disciplinaEspecializacaoRoutes2 = _interopRequireDefault(_disciplinaEspecializacaoRoutes);
var _turmaDisciplinaEspecializacaoRoutes = require('./curso_especializacao/turmaDisciplinaEspecializacaoRoutes'); var _turmaDisciplinaEspecializacaoRoutes2 = _interopRequireDefault(_turmaDisciplinaEspecializacaoRoutes);

// instituicao  
var _instituicaoEnsinoBrasileiraRoutes = require('./instituicao/instituicaoEnsinoBrasileiraRoutes'); var _instituicaoEnsinoBrasileiraRoutes2 = _interopRequireDefault(_instituicaoEnsinoBrasileiraRoutes);
var _instituicaoEnsinoEstrangeiraRoutes = require('./instituicao/instituicaoEnsinoEstrangeiraRoutes'); var _instituicaoEnsinoEstrangeiraRoutes2 = _interopRequireDefault(_instituicaoEnsinoEstrangeiraRoutes);
var _instituicaoEnsinoRoutes = require('./instituicao/instituicaoEnsinoRoutes'); var _instituicaoEnsinoRoutes2 = _interopRequireDefault(_instituicaoEnsinoRoutes);

// ofertacoletiva
var _alunoIsFParticipaTurmaOCRoutes = require('./ofertacoletiva/alunoIsFParticipaTurmaOCRoutes'); var _alunoIsFParticipaTurmaOCRoutes2 = _interopRequireDefault(_alunoIsFParticipaTurmaOCRoutes);
var _cursoRoutes = require('./ofertacoletiva/cursoRoutes'); var _cursoRoutes2 = _interopRequireDefault(_cursoRoutes);
var _professorIsFMinistraTurmaOCRoutes = require('./ofertacoletiva/professorIsFMinistraTurmaOCRoutes'); var _professorIsFMinistraTurmaOCRoutes2 = _interopRequireDefault(_professorIsFMinistraTurmaOCRoutes);
var _turmaOCRoutes = require('./ofertacoletiva/turmaOCRoutes'); var _turmaOCRoutes2 = _interopRequireDefault(_turmaOCRoutes);

// proeficiencia
var _proeficienciaAlunoIsFRoutes = require('./proeficiencia/proeficienciaAlunoIsFRoutes'); var _proeficienciaAlunoIsFRoutes2 = _interopRequireDefault(_proeficienciaAlunoIsFRoutes);
var _proeficienciaProfessorIsFRoutes = require('./proeficiencia/proeficienciaProfessorIsFRoutes'); var _proeficienciaProfessorIsFRoutes2 = _interopRequireDefault(_proeficienciaProfessorIsFRoutes);

// usuario_pertence_instituicao
var _comprovanteAlunoInstituicaoRoutes = require('./usuario_pertence_instituicao/comprovanteAlunoInstituicaoRoutes'); var _comprovanteAlunoInstituicaoRoutes2 = _interopRequireDefault(_comprovanteAlunoInstituicaoRoutes);
var _comprovanteProfessorInstituicaoRoutes = require('./usuario_pertence_instituicao/comprovanteProfessorInstituicaoRoutes'); var _comprovanteProfessorInstituicaoRoutes2 = _interopRequireDefault(_comprovanteProfessorInstituicaoRoutes);

// usuarios
var _alunoDeInstituicaoRoutes = require('./usuarios/alunoDeInstituicaoRoutes'); var _alunoDeInstituicaoRoutes2 = _interopRequireDefault(_alunoDeInstituicaoRoutes);
var _alunoEstrangeiroRoutes = require('./usuarios/alunoEstrangeiroRoutes'); var _alunoEstrangeiroRoutes2 = _interopRequireDefault(_alunoEstrangeiroRoutes);
var _alunoGraduacaoRoutes = require('./usuarios/alunoGraduacaoRoutes'); var _alunoGraduacaoRoutes2 = _interopRequireDefault(_alunoGraduacaoRoutes);
var _alunoIsFRoutes = require('./usuarios/alunoIsFRoutes'); var _alunoIsFRoutes2 = _interopRequireDefault(_alunoIsFRoutes);
var _coordenadorNacionalIdiomaRoutes = require('./usuarios/coordenadorNacionalIdiomaRoutes'); var _coordenadorNacionalIdiomaRoutes2 = _interopRequireDefault(_coordenadorNacionalIdiomaRoutes);
var _cursistaEspecializacaoRoutes = require('./usuarios/cursistaEspecializacaoRoutes'); var _cursistaEspecializacaoRoutes2 = _interopRequireDefault(_cursistaEspecializacaoRoutes);
var _professorIsFRoutes = require('./usuarios/professorIsFRoutes'); var _professorIsFRoutes2 = _interopRequireDefault(_professorIsFRoutes);
var _usuarioRoutes = require('./usuarios/usuarioRoutes'); var _usuarioRoutes2 = _interopRequireDefault(_usuarioRoutes);

const router = new (0, _express.Router)()

////// Rotas

// authentication
router.post('/login', _SessionController2.default.store)

// curso_especializacao
router.use('/disciplina_especializacao', _disciplinaEspecializacaoRoutes2.default)
router.use('/turma_especializacao', _turmaDisciplinaEspecializacaoRoutes2.default)

// instituicao
router.use('/instituicao_ensino_brasileira', _instituicaoEnsinoBrasileiraRoutes2.default)
router.use('/instituicao_ensino_estrangeira', _instituicaoEnsinoEstrangeiraRoutes2.default)
router.use('/instituicao_ensino', _instituicaoEnsinoRoutes2.default)

// ofertacoletiva
router.use('/alunoisf_participa_turmaoc', _alunoIsFParticipaTurmaOCRoutes2.default)
router.use('/curso', _cursoRoutes2.default)
router.use('/professorisf_ministra_turmaoc', _professorIsFMinistraTurmaOCRoutes2.default)
router.use('/turma_oc', _turmaOCRoutes2.default)

// proeficiencia
router.use('/proeficiencia_alunoisf', _proeficienciaAlunoIsFRoutes2.default)
router.use('/proeficiencia_professorisf', _proeficienciaProfessorIsFRoutes2.default)

// usuario_pertence_instituicao
router.use('/comprovante_aluno_instituicao', _comprovanteAlunoInstituicaoRoutes2.default)
router.use('/comprovante_professor_instituicao', _comprovanteProfessorInstituicaoRoutes2.default)

// usuarios
router.use('/aluno_deinstituicao', _alunoDeInstituicaoRoutes2.default)
router.use('/aluno_estrangeiro', _alunoEstrangeiroRoutes2.default)
router.use('/aluno_graduacao', _alunoGraduacaoRoutes2.default)
router.use('/aluno_isf', _alunoIsFRoutes2.default)
router.use('/coordenador_nacional_idioma', _coordenadorNacionalIdiomaRoutes2.default)
router.use('/cursista_especializacao', _cursistaEspecializacaoRoutes2.default)
router.use('/professor_isf', _professorIsFRoutes2.default)
router.use('/usuario', _usuarioRoutes2.default)

exports. default = router