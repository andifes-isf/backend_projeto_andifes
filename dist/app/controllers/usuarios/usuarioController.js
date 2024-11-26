"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Utils
var _emailDomainFactory = require('../../utils/emailDomain/emailDomainFactory'); var _emailDomainFactory2 = _interopRequireDefault(_emailDomainFactory);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);
var _CustomError = require('../../utils/response/CustomError/CustomError'); var _CustomError2 = _interopRequireDefault(_CustomError);
var _ErrorType = require('../../utils/response/ErrorType/ErrorType'); var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _httpStatus = require('../../utils/response/httpStatus/httpStatus'); var _httpStatus2 = _interopRequireDefault(_httpStatus);

// Repository
var _UserRepository = require('../../repositories/usuarios/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

class usuarioController {
    // AUXILIAR FUNCTIONS

    static verifyUserType(userTypes, userType) {
        const founded = userTypes.find((type) => {
            return type == userType
        })

        if (typeof founded === "undefined") {
            return new (0, _CustomError2.default)(
                _messages_pt2.default.ACCESS_DENIED,
                _ErrorType2.default.UNAUTHORIZED_ACCESS
            )
        }
    }

    static async verifyExistingObject(repository, key, message) {
        const existingObject = await repository.findByPk(key)
        console.log(existingObject)

        if (existingObject) {

            return new (0, _CustomError2.default)(
                message + key,
                _ErrorType2.default.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingNotification(user, id, login) {
        const notification = await user.getNotificacaos({
            where: {
                idNotificacao: id,
                login: login
            }
        }) 

        if(notification.length === 0){
            return new (0, _CustomError2.default)(
                _messages_pt2.default.NOTIFICATION_NOT_FOUND + id,
                _ErrorType2.default.NOT_FOUND
            )
        }

        return notification[0]
    }

    static async postUser(req, _, type) {
        const existingUser = await usuarioController.verifyExistingObject(_UserRepository2.default, req.body.login, _messages_pt2.default.EXISTING_USER)

        if(existingUser) {
            return {
                error: true,
                user: existingUser
            }
        }

        const user = await _UserRepository2.default.create({
            login: req.body.login,
            name: req.body.name,
            surname: req.body.surname,
            DDI: req.body.DDI,
            DDD: req.body.DDD,
            phone: req.body.phone,
            ethnicity: req.body.ethnicity,
            gender: req.body.gender,
            active: 1,
            email: req.body.email,
            email_domain: req.body.email_domain,
            password: req.body.password,
            type: type
        })

        return {
            error: false,
            user: user
        }
    }
    
    // ENDPOINTS

    async get(_, res) {
        const users = await _usuario2.default.findAll()
        
        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            users
        })
    }

    async getMyData(req, res) {
        const user = await _usuario2.default.findOne({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            user
        })
    }

    async getNotificacoes(req, res){
        const user = await _usuario2.default.findByPk(req.loginUsuario)

        const notifications = await user.getNotificacaos() 

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            notifications
        })
    }

    async getNotificacoesNaoLidas(req, res){
        const user = await _usuario2.default.findByPk(req.loginUsuario)

        const notifications = await user.getNotificacoesNaoLidas() 

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            notifications
        })
    }

    async getNotificacao(req, res){
        const user = await _usuario2.default.findByPk(req.loginUsuario)

        const notification = await usuarioController.verifyExistingNotification(user, req.params.idNotificacao, req.loginUsuario)

        if (notification instanceof _CustomError2.default) {
            return res.status(_httpStatus2.default.SUCCESS).json({
                error: true,
                message: notification.message,
                errorName: notification.name
            })
        }
        
        notification.lida = 1
        await notification.save()

        return res.status(_httpStatus2.default.SUCCESS).json({
            error: false,
            notification
        })
    }
}

exports. default = usuarioController