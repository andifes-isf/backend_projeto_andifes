class GetNotifications {
    async exec(user, notificationRepository) {
        return await notificationRepository.getNotifications(user)
    }
}

export default new GetNotifications()