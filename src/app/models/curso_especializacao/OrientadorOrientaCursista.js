import Sequelize, { Model } from 'sequelize'
import { Sequelize } from "sequelize";

class OrientadorOrientaCursista extends Model {
    static init(sequelize) {
        super.init(
            {
                loginOrientador: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                loginCursista: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                status: {
                    type: Sequelize.ENUM('ativo', 'inativo'),
                    allowNull: false,
                    defaultValue: 'ativo'
                },
                inicio: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
                },
                termino: {
                    type: Sequelize.DATEONLY,
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'orientadororientacursista',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'loginOrientador' },
                        { name: 'loginCursista' }
                    ]
                }]
            }
        )

        return this

    }
}

export default OrientadorOrientaCursista