class GetUnreadNotification {
    async exec(user, notificationRepository) {
        return await notificationRepository.getUnreadNotifications(user)
    }
}

export default new GetUnreadNotification()