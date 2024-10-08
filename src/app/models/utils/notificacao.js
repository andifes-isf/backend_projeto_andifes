import Sequelize, { Model } from 'sequelize'

class Notificacao extends Model {
    static init (sequelize) {
        super.init(
            {
                idNotificacao: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true
                },
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                mensagem: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                tipo: {
                    type: Sequelize.ENUM('pendencia', 'feedback'),
                    allowNull: false
                },
                chaveReferenciado: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                modeloReferenciado: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                lida: {
                    type: Sequelize.TINYINT,
                    defaultValue: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                },
                deletedAt: {
                    type: Sequelize.DATE
                }
            },
            {                
                sequelize,
                timestamps: true,
                updatedAt: false,
                paranoid: true,
                tableName: 'notificacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' },
                        { name: 'idNotificacao'}
                    ]
                }]
            }
        )
        
        return this

    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        });
    }

}

export default Notificacao