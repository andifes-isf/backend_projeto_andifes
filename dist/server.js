"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// import App from "./app"
// import ManagerCron from "./cron/ManagerCron"

// App.listen(8800, () => {
//     ManagerCron.run()
// })

require('express-async-errors');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./app/routes/routes'); var _routes2 = _interopRequireDefault(_routes);
require('./database');

const app = _express2.default.call(void 0, )

app.use(_express2.default.json())
app.use(_routes2.default)

app.use((error, req, res, next) => {
    return res.status(error.status).json(error.message)
})


app.listen(8800, () => {
    console.log('Teste')
})