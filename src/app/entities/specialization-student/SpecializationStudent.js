// Model
import IsFTeacher from "../isf-teacher/IsFTeacher"

// Validation


export default class SpecializationStudent extends IsFTeacher{
    constructor({login, ...isfTeacher}) {
        super({login, ...isfTeacher, specialization_student: 1})
        this.practical_hours = 0
        this.nc_hours = 0
        this.ccti_hours = 0
        this.ccip_hours = 0
        this.cci_hours = 0
        this.has_mentor = 0
    }

    validateData() {
        const isfTeacherResult = super.validateData()

        if (isfTeacherResult.error) {
            return {
                error: true,
                result: isfTeacherResult.result
            }
        }

        return {
            error: false
        }
    }
}