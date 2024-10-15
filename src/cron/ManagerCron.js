import CreateReportNotification from './CreateReportNotification'

class ManagerCron {
    constructor(){
        this.jobs = [ CreateReportNotification ]
    }

    run() {
        this.jobs.forEach(job => job.start())
    }
}

export default new ManagerCron()