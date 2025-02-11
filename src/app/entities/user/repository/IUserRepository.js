class IUserRepository {
    createUser(data) {
        throw new Error("Method 'createUser' must be implemented")
    }
    findByPk(data) {
        throw new Error("Method 'findByPk' must be implemented")
    }
    findAll() {
        throw new Error("Method 'findAll' must be implemented")
    }
    getNotification(data) {
        throw new Error("Method 'getNotification' must be implemented")
    }
    getNotifications() {
        throw new Error("Method 'getNotification' must be implemented")
    }
    getUnreadNotifications() {
        throw new Error("Method 'getUnreadNotifications' must be implemented")
    }
}

export default IUserRepository