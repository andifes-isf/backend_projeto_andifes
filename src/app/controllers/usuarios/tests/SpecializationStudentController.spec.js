import SpecializationStudentRepository from '../../../repositories/usuarios/SpecializationStudentRepository'
import SpecializationStudentController from '../cursistaEspecializacaoController'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'

jest.mock('../../../repositories/usuarios/SpecializationStudentRepository')

describe('SPECIALIZATION STUDENT', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should not permit creation", async () => {
        const login = "Ademir"

        const request = {
            body: {
                login: login
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        SpecializationStudentRepository.findByPk.mockResolvedValue({
            login: login
        })

        await SpecializationStudentController.post(request, response)

        expect(SpecializationStudentRepository.findByPk).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.EXISTING_SPECIALIZATION_STUDENT + login,
            errorName: ErrorType.DUPLICATE_ENTRY
        })
        
    })
})