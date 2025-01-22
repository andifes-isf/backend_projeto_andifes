import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import UserRepositorySequelize from '../../user/repository/UserRepositorySequelize' 
import authConfig from '../../../config/auth'
import MESSAGES from '../../utils/response/messages/messages_pt'

class SessionController {
    async store(req, res) {
        // Consistencia se o dado (constraint) confere na base
        let {
            login,
            password
        } = req.body

        const user = await UserRepositorySequelize.findByPk(login)

        if(!user) {
            return res.status(401).json({
                error: MESSAGES.USER_NOT_FOUND
            })
        }

        // Consistencia se a senha confere no Model
        if(!(await bcrypt.compare(password, user.encrypted_password))) {
            return res.status(401).json({
                msg: MESSAGES.INVALID_PASSWORD
            })
        }

        const { type } = user

        return res.json({
            user: {
                login,
                type
            },
            token: jwt.sign({
                login,
                type
            }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()