import * as Yup from 'yup'

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from '../../utils/response/CustomError/CustomError'
import ErrorType from '../../utils/response/ErrorType/ErrorType'
import httpStatus from '../../utils/response/httpStatus/httpStatus'

// Use Cases
import CreateUser from './use-cases/CreateUser'
import GetUsers from './use-cases/GetUsers'
import GetMyData from './use-cases/GetMyData'
import GetNotification from './use-cases/GetNotification'
import GetNotifications from './use-cases/GetNotifications'
import GetUnreadNotifications from './use-cases/GetUnreadNotifications'

// Repository
import UserRepository from './repository/UserRepositorySequelize'

class usuarioController {
  // AUXILIAR FUNCTIONS

  static verifyUserType(userTypes, userType) {
    const founded = userTypes.find((type) => {
      return type == userType;
    });

    if (typeof founded === 'undefined') {
      return new CustomError(
        MESSAGES.ACCESS_DENIED,
        ErrorType.UNAUTHORIZED_ACCESS
      );
    }
  }

  static async verifyNonExistingObject(repository, key, message) {
    const existingObject = await repository.findByPk(key);

    if (existingObject == null) {
      return new CustomError(message + key, ErrorType.NOT_FOUND);
    }

    return existingObject;
  }

  static async verifyExistingObject(repository, key, message) {
    const existingObject = await repository.findByPk(key);

    if (existingObject) {
      return new CustomError(message + key, ErrorType.DUPLICATE_ENTRY);
    }
  }

  static async verifyExistingNotification(user, id) {
    const notification = await UserRepository.getNotification(user, id);

    if (notification.length === 0) {
      return new CustomError(
        MESSAGES.NOTIFICATION_NOT_FOUND + id,
        ErrorType.NOT_FOUND
      );
    }

    return notification[0];
  }

    static async postUser(req, _, type) {
        const existingUser = await usuarioController.verifyExistingObject(UserRepository, req.body.login, MESSAGES.EXISTING_USER)
        if(existingUser) {
            return {
                error: true,
                user: existingUser
            }
        }
        
        const {error, result} = await CreateUser.exec({
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
        }, UserRepository)

        if (error) {
            return {
                error: error,
                result
            }
        }

        return {
            error: false,
            result
        }
    }
    
    // ENDPOINTS

    /**
     *
     * @route GET /user 
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async get(_, res) {
        const users = await GetUsers.exec(UserRepository)
        
        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: users
        })
    }

  /**
   *
   * @requires Authentication
   * @route GET /user/my_data
   *
   * RETORNO
   * @returns {int} httpStatus - The value might be:
   * 200 - SUCCESS
   * 401 - UNAUTHORIZED
   * 500 - INTERNAL_SERVER_ERROR
   * @returns {boolean} error
   *
   * if return an error
   * @returns {string} message - error's message
   * @returns {string} errorName - error's name
   *
   * if return successfully
   * @returns {ProfessorIsF} data
   */
  async getMyData(req, res) {
    const user = await GetMyData.exec(req.loginUsuario, UserRepository);

    return res.status(httpStatus.SUCCESS).json({
      error: false,
      data: user,
    });
  }

  /**
   *
   * @requires Authentication
   * @route GET /user/notification
   *
   * RETORNO
   * @returns {int} httpStatus - The value might be:
   * 200 - SUCCESS
   * 401 - UNAUTHORIZED
   * 500 - INTERNAL_SERVER_ERROR
   * @returns {boolean} error
   *
   * if return an error
   * @returns {string} message - error's message
   * @returns {string} errorName - error's name
   *
   * if return successfully
   * @returns {ProfessorIsF} data
   */
  async getNotificacoes(req, res) {
    const user = await UserRepository.findByPk(req.loginUsuario);

    const notifications = await GetNotifications.exec(user, UserRepository);

    return res.status(httpStatus.SUCCESS).json({
      error: false,
      data: notifications,
    });
  }

  /**
   *
   * @requires UNAUTHORIZED
   * @route GET /user/unread_notifications
   *
   * RETORNO
   * @returns {int} httpStatus - The value might be:
   * 200 - SUCCESS
   * 401 - UNAUTHORIZED
   * 500 - INTERNAL_SERVER_ERROR
   * @returns {boolean} error
   *
   * if return an error
   * @returns {string} message - error's message
   * @returns {string} errorName - error's name
   *
   * if return successfully
   * @returns {ProfessorIsF} data
   */
  async getNotificacoesNaoLidas(req, res) {
    const user = await UserRepository.findByPk(req.loginUsuario);

    const notifications = await GetUnreadNotifications.exec(user, UserRepository);

    return res.status(httpStatus.SUCCESS).json({
      error: false,
      data: notifications,
    });
  }

    /**
     * 
     * @requires Authentication
     * @route GET /user/notification/:notificationId
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {ProfessorIsF} data
     */
    async getNotificacao(req, res){
        const notification = await GetNotification.exec([req.loginUsuario, req.params.notificationId], UserRepository)

        if (notification.error) {
            return res.status(httpStatus.BAD_REQUEST).json(notification)
        }

    return res.status(httpStatus.SUCCESS).json({
      error: false,
      data: notification,
    });
  }

  // Atualizar dados do usuário
  async updateMyData(req, res) {
    try {
      const userLogin = req.loginUsuario; // Login do usuário autenticado
      const { name, surname, DDI, DDD, phone, ethnicity, gender } = req.body;

      // Verifica se o usuário existe
      const user = await Usuario.findByPk(userLogin);

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Usuário não encontrado.',
        });
      }

      // Atualiza os dados
      await user.update({ name, surname, DDI, DDD, phone, ethnicity, gender });

      return res.status(200).json({
        error: false,
        message: 'Dados atualizados com sucesso.',
        user,
      });
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao atualizar os dados do usuário.',
      });
    }
  }
}

export default usuarioController;
