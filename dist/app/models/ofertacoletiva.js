"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class OfertaColetiva extends _sequelize.Model {
    static init(sequelize) {
        super.init({
            ano: {
                type: _sequelize2.default.INTEGER,
                primaryKey: true    
            },
            edicao: {
                type: _sequelize2.default.INTEGER,
                primaryKey: true
            },
            codigo: _sequelize2.default.STRING
        },
        {
            sequelize,
            tableName: 'ofertacoletiva',
            timestamps: false,
            indexes: [{
                name: 'primary_key',
                unique: true,
                using: 'BTREE',
                fields: [
                    { name: 'ano' },
                    { name: 'edicao' }
                ]
            }]
        });

        // Hook para gerar o código antes de salvar
        this.addHook('beforeSave', async (oferta) => {
            oferta.codigo = `${oferta.ano}_${oferta.edicao}`;
        });

        return this;
    }
}

exports. default = OfertaColetiva;
