module.exports = (Sequelize, Datatype) => {
    const alias = 'Product'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Datatype.STRING,
                notNull: true
            },
            description: {
                type: Datatype.STRING
            },
            category_id: {
                type: Datatype.INTEGER
            },
            price: {
                type: Datatype.DECIMAL(10,2)
            },
            stock: {
                type: Datatype.INTEGER
            },
            offert: {
                type: Datatype.STRING,
                notNull: true
            },
            createdAt: {
                type: Datatype.DATE
            },
            updatedAt: {
                type: Datatype.DATE
            }
        }
    const config = {
        timestamps: true,
        paranoid: false             //sof delete?
        //tableName: 'products'
    }

    const Product = Sequelize.define(alias,cols,config)

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }

    

    return Product
}