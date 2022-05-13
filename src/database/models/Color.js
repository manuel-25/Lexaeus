module.exports = (Sequelize, Datatype) => {
    const alias = 'Color'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Datatype.STRING,
                notNull: true
            }
        }
    const config = {
        timestamps: false,
        paranoid: false
        //tableName: 'products'
    }

    const Color = Sequelize.define(alias,cols,config)

    Color.associate = function(models) {
        Color.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'color_id'
        })
    }


    return Color
}