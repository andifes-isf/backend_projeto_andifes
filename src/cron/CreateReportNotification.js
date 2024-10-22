import cron from 'node-cron'
import CursistaEspecializacao from '../app/models/usuarios/cursistaespecializacao'
import Notificacao from '../app/models/utils/notificacao'
import notificationTypes from '../app/utils/notificationType/notificationType'

async function CreateReportNotification() {
    const cursistas = await CursistaEspecializacao.findAll()

    const promises = cursistas.map(async (cursista) => {
        try {
            const notification = await Notificacao.create({
                login: cursista.login,
                mensagem: "Período de envio de relatórios de orientação aberto",
                tipo: notificationTypes.AVISO,
                chaveReferenciado: cursista.login,
                modeloReferenciado: "notificacao"
            }) 

            return { status: 'success', notification: notification}
        } catch (error) {
            return { status: 'falho', disciplina: disciplina.nomeDisciplina, message: error.message}
        }
    })

    const results = await Promise.allSettled(promises)
    let sucesso = []
    let falha = []
    let erroInesperado = []

    resultados.forEach((resultado) => {
        if (resultado.status === 'fulfilled' && resultado.value.status === 'sucesso') {
            sucesso.push(`Disciplina ${resultado.value.disciplina} inserida com sucesso.`);
        } else if (resultado.status === 'fulfilled' && resultado.value.status === 'falho') {
            falha.push(`Erro ao inserir disciplina ${resultado.value.disciplina}: ${resultado.value.message}`);
        } else {
            erroInesperado.push(`Erro inesperado:`, resultado.reason);
        }
    })

    return { sucesso: sucesso, falha: falha, erroInesperado: erroInesperado}
}

export default cron.schedule("0 0 20 * *", CreateReportNotification, {
    scheduled: false
})  