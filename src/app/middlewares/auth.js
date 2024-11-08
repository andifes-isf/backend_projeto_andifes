import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth'
import MESSAGES from '../utils/response/messages/messages_pt'
import CustomError from '../utils/response/CustomError/CustomError'
import httpStatus from '../utils/response/httpStatus/httpStatus'
import ErrorType from '../utils/response/ErrorType/ErrorType'

export default async(req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: MESSAGES.LOGIN_NECESSARY,
            errorName: ErrorType.UNAUTHORIZED_ACCESS
        })
    }

    // Desestruturação de vetor (Bearer, ...token)
    const [, token] = authorization.split(' ')

    try {
        const{ login, tipo } = await promisify(jwt.verify)(token, authConfig.secret)

        req.loginUsuario = login
        req.tipoUsuario = tipo
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: MESSAGES.INVALID_TOKEN,
            errorName: ErrorType.UNAUTHORIZED_ACCESS
        })
    }
    
    return next()

}