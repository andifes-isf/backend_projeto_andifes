"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _ManagerCron = require('./cron/ManagerCron'); var _ManagerCron2 = _interopRequireDefault(_ManagerCron);

_app2.default.listen(8800, () => {
    _ManagerCron2.default.run()
})