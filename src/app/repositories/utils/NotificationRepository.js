import Notification from '../../models/utils/notificacao'


class NotificationRepository {
    async create(data) {
        return await Notification.create(data)
    }
}

export default new NotificationRepository()