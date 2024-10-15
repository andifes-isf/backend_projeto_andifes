import App from "./app"
import ManagerCron from "./cron/ManagerCron"

App.listen(8800, () => {
    ManagerCron.run()
})