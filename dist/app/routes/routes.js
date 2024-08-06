"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

// Autenticação
var _SessionController = require('../controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

// Models
var _usuarioRoutes = require('./usuarioRoutes'); var _usuarioRoutes2 = _interopRequireDefault(_usuarioRoutes);
var _professorIsFRoutes = require('./professorIsFRoutes'); var _professorIsFRoutes2 = _interopRequireDefault(_professorIsFRoutes);
var _instituicaoEnsinoRoutes = require('./instituicaoEnsinoRoutes'); var _instituicaoEnsinoRoutes2 = _interopRequireDefault(_instituicaoEnsinoRoutes);
var _cursoRoutes = require('./cursoRoutes'); var _cursoRoutes2 = _interopRequireDefault(_cursoRoutes);
var _comprovanteAlunoInstituicaoRoutes = require('./comprovanteAlunoInstituicaoRoutes'); var _comprovanteAlunoInstituicaoRoutes2 = _interopRequireDefault(_comprovanteAlunoInstituicaoRoutes);
var _alunoIsFRoutes = require('./alunoIsFRoutes'); var _alunoIsFRoutes2 = _interopRequireDefault(_alunoIsFRoutes);
var _alunoDeInstituicaoRoutes = require('./alunoDeInstituicaoRoutes'); var _alunoDeInstituicaoRoutes2 = _interopRequireDefault(_alunoDeInstituicaoRoutes);
var _turmaOCRoutes = require('./turmaOCRoutes'); var _turmaOCRoutes2 = _interopRequireDefault(_turmaOCRoutes);
var _professorIsFMinistraTurmaOCRoutes = require('./professorIsFMinistraTurmaOCRoutes'); var _professorIsFMinistraTurmaOCRoutes2 = _interopRequireDefault(_professorIsFMinistraTurmaOCRoutes);
var _alunoIsFParticipaTurmaOCRoutes = require('./alunoIsFParticipaTurmaOCRoutes'); var _alunoIsFParticipaTurmaOCRoutes2 = _interopRequireDefault(_alunoIsFParticipaTurmaOCRoutes);
var _comprovanteProfessorInstituicaoRoutes = require('./comprovanteProfessorInstituicaoRoutes'); var _comprovanteProfessorInstituicaoRoutes2 = _interopRequireDefault(_comprovanteProfessorInstituicaoRoutes);


const router = new (0, _express.Router)()

// Rotas de autenticação
router.post('/login', _SessionController2.default.store)

// Rotas de uso
router.use('/usuario', _usuarioRoutes2.default)
router.use('/professor_isf', _professorIsFRoutes2.default)
router.use('/instituicao_ensino', _instituicaoEnsinoRoutes2.default)
router.use('/curso', _cursoRoutes2.default)
router.use('/comprovante_aluno_instituicao', _comprovanteAlunoInstituicaoRoutes2.default)
router.use('/aluno_isf', _alunoIsFRoutes2.default)
router.use('/aluno_deinstituicao', _alunoDeInstituicaoRoutes2.default)
router.use('/turma_oc', _turmaOCRoutes2.default)
router.use('/professorisf_ministra_turmaoc', _professorIsFMinistraTurmaOCRoutes2.default)
router.use('/alunoisf_participa_turmaoc', _alunoIsFParticipaTurmaOCRoutes2.default)
router.use('/comprovante_professor_instituicao', _comprovanteProfessorInstituicaoRoutes2.default)

exports. default = router