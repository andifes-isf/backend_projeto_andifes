"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoDeInstituicao extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                nDocumento: {
                    type: _sequelize2.default.STRING,
                    unique: true
                },
                cargo: {
                    type: _sequelize2.default.INTEGER,
                },
                areaAtuacao: {
                    type: _sequelize2.default.ENUM('ciencias exatas e da terra','ciencias biologicas','engenharia/tecnologia','ciencias da saude','ciencias agrarias','ciencias sociais','ciencias humanas','linguistica','letras e artes', 'prefiro nao dizer'),
                    allowNull: false
                },
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true,
                }
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'aluno_isf_instituicao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' }
                    ]
                }]
            }
        )
        
        return this

    }

    static associate(models) {
        this.belongsTo(models.AlunoIsF, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.InstituicaoEnsino, {
            through: 'comprovante_aluno_instituicao',
            foreignKey: 'login',
            sourceKey: 'login',
            timestamps: false,
            as: "institution"
        })
    }

}

exports. default = AlunoDeInstituicao