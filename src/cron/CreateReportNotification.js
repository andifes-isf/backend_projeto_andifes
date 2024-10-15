import cron from 'node-cron'
import CursistaEspecializacao from '../app/models/usuarios/cursistaespecializacao'
import Notificacao from '../app/models/utils/notificacao'

async function CreateReportNotification() {
    const cursistas = await CursistaEspecializacao.findAll()
    cursistas.forEach(async cursista => {
        await Notificacao.create({
            login: cursista.login,
            mensagem: "Período de envio de relatórios de orientação aberto",
            tipo: 'pendencia',
            chaveReferenciado: cursista.login,
            modeloReferenciado: "notificacao"
        }) 
    })
}

export default cron.schedule("0 0 20 * *", CreateReportNotification, {
    scheduled: false
})