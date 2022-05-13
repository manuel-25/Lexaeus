module.exports = (Sequelize, Datatype) => {
    const alias = 'Size'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Datatype.STRING,
                notNull: true
            },
            size: {
                type: Datatype.STRING,
                notNull: true
            }
        }
    const config = {
        timestamps: false,
        paranoid: false
        //tableName: 'products'
    }

    const Size = Sequelize.define(alias,cols,config)

    Size.associate = function(models) {
        Size.belongsToMany(models.Product, {
            as: 'products',                                //Como se llamara el objeto que contiene los datos
            through: 'product_size',
            foreignKey: 'size_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }



    return Size
}