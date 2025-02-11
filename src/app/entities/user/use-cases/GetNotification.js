class GetNotification {
    async exec(data, notificationRepository) {
        return await notificationRepository.getNotification(data)
    }
}

export default new GetNotification()