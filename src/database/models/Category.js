module.exports = (Sequelize, Datatype) => {
    const alias = 'Category'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
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

    const Category = Sequelize.define(alias,cols,config)

    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }


    return Category
}