import Sequelize, { Model } from 'sequelize'
import { Sequelize } from "sequelize";

class OrientadorOrientaCursista extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },
                loginOrientador: {
                    type: Sequelize.STRING,
                },
                loginCursista: {
                    type: Sequelize.STRING
                },
                status: {
                    type: Sequelize.ENUM('ativo', 'inativo'),
                    allowNull: false,
                    defaultValue: 'ativo'
                },
                inicio: {
                    type: Sequelize.DATEONLY
                },
                termino: {
                    type: Sequelize.DATEONLY,
                }
            },
            {
                sequelize,
                timestamps: true,
                updatedAt: false,
                createdAt: 'inicio',
                paranoid: true,
                deletedAt: 'termino',
                tableName: 'orientadororientacursista',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'inicio' }
                    ]
                }]
            }
        )

        // Hooks
        this.addHook(`beforeDestroy`, async (orientacao, options) => {
            if(orientacao.status == 'ativo') {
                orientacao.status = 'inativo'
                await orientacao.save()
            }
        })

        return this
    }

}

export default OrientadorOrientaCursista