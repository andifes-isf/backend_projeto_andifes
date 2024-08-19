"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nivel = require('../niveis/nivel'); var _nivel2 = _interopRequireDefault(_nivel);
var _nivelJapones = require('../niveis/nivelJapones'); var _nivelJapones2 = _interopRequireDefault(_nivelJapones);

class nivelFactory{
    createInstanceOfNivel(idioma){
        if(idioma == 'japones'){
            return new (0, _nivelJapones2.default)()
        }
        return new (0, _nivel2.default)()
    }
}

exports. default = new nivelFactory()