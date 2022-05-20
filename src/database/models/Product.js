module.exports = (Sequelize, Datatype) => {
    const alias = 'Product'
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
            onList: {
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

        Product.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'color_id'
        })

        Product.belongsToMany(models.Size, {
            as: 'sizes',                                //Como se llamara el objeto que contiene los datos
            through: 'product_size',
            foreignKey: 'product_id',
            otherKey: 'size_id',
            timestamps: false
        })

        Product.belongsToMany(models.File, {
            as: 'files',
            through: 'product_file',
            foreignKey: 'product_id',
            otherKey: 'file_id',
            timestamps: false
        })
    }


    return Product
}