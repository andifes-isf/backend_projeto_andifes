import App from "./app"
import ManagerCron from "./cron/ManagerCron"

App.get("/test", async(req, res) => {
    res.send({id: 1, name: res.__('MESSAGE')})
})

App.listen(8800, () => {
    ManagerCron.run()
})