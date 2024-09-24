import * as Yup from 'yup'
import TurmaDisciplinaEspecializacao from '../../models/curso_especializacao/turmadisciplinaespecializacao'
import AlteracaoTurmaEspecializacao from '../../models/curso_especializacao/alteracaoturmaespecializacao'

class turmaDisciplinaEspecializacaoController {
    
    async post(req, res){
        try {

            const nomeTurma = req.body.edital + "_" + req.body.disciplina + "_" + req.body.mesOferta

            const turmaExistente = await TurmaDisciplinaEspecializacao.findOne({
                where: {
                    nome: nomeTurma,
                }
            })
            
            if(turmaExistente) {
                return res.status(409).json({
                    msg: "Turma ja cadastrada no sistema"
                })
            }
            
            const turma = await TurmaDisciplinaEspecializacao.create({
                disciplina: req.body.disciplina,
                edital: req.body.edital,
                nome: req.body.nome,
                mesOferta: req.body.mesOferta,
                numeroVagas: req.body.numeroVagas,
                numeroMinimoAlunos: req.body.numeroMinimoAlunos,
                numeroInscritos: req.body.numeroInscritos,
                numeroAprovados: req.body.numeroAprovados,
                numeroDesistentes: req.body.numeroDesistentes,
                numeroReprovados: req.body.numeroReprovados,
            })	
            
            return res.status(201).json(turma)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
    
    async get(_, res) {
        try {
            const turmas = await TurmaDisciplinaEspecializacao.findAll()
            
            return res.status(200).json(turmas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
    
    // Método para verificar se a turma existe
    static async verificaTurmaExistente(nome) {
        return await TurmaDisciplinaEspecializacao.findOne({ where: { nome } });
    }

    static async verificaModificacaoRealizada(login, turma, novosDados){
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
    
    static async criaAlteracao(login, turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        const alteracao = await AlteracaoTurmaEspecializacao.create({
            login: login,
            valorAnteriorNumeroVagas: turma.numeroVagas,
            valorPosteriorNumeroVagas: numeroVagas === undefined ? turma.numeroVagas : numeroVagas,
            valorAnteriorNumeroMinimoAlunos: turma.numeroMinimoAlunos,
            valorPosteriorNumeroMinimoAlunos: numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos
        })
    }

    static async atualizaRegistroTurma(turma, novosDados){
        const { numeroVagas, numeroMinimoAlunos } = novosDados

        turma.numeroVagas = numeroVagas === undefined ? turma.numeroVagas : numeroVagas
        turma.numeroMinimoAlunos = numeroMinimoAlunos === undefined ? turma.numeroMinimoAlunos : numeroMinimoAlunos

        await turma.save()
    }

    async updateData(req, res){
        try {
            
            // variáveis
            const { nome } = req.params
            const { loginUsuario, tipoUsuario } = req
            
            if(!(req.tipoUsuario) === 'coordenadornacionalidioma'){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }
            
            // Buscando registro no banco de dados
            const turma = await turmaDisciplinaEspecializacaoController.verificaTurmaExistente(nome);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }
            
            // console.log(turma)
            // Verificando se a alteração ja foi realizada
            if(!(await turmaDisciplinaEspecializacaoController.verificaModificacaoRealizada(loginUsuario, turma, req.body))){
                return res.status(409).json({
                    error: "Nenhuma alteracao foi realizada"
                })
            }
            
            // Salvando o histórico da atualização            
            await turmaDisciplinaEspecializacaoController.criaAlteracao(loginUsuario, turma, req.body)
            
            // Atualizando o registro
            await turmaDisciplinaEspecializacaoController.atualizaRegistroTurma(turma, req.body)
            
            return res.status(201).json(turma)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new turmaDisciplinaEspecializacaoController()