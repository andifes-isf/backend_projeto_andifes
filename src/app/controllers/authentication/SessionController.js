import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import Usuario from '../../models/usuarios/usuario'
import authConfig from '../../../config/auth'
import MESSAGES from '../../utils/response/messages/messages_pt'

class SessionController {
    async store(req, res) {
        // Consistencia se o dado (constraint) confere na base
        let {
            login,
            senha
        } = req.body

        const usuario = await Usuario.findOne({
            where: {
                login
            }
        })

        if(!usuario) {
            return res.status(401).json({
                error: MESSAGES.USER_NOT_FOUNDED
            })
        }

        // Consistencia se a senha confere no Model
        if(!(await bcrypt.compare(senha, usuario.senha_encriptada))) {
            return res.status(401).json({
                msg: MESSAGES.INVALID_PASSWORD
            })
        }

        const { tipo } = usuario

        return res.json({
            usuario: {
                login,
                tipo
            },
            token: jwt.sign({
                login,
                tipo
            }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()