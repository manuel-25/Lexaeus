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
            price: {
                type: Datatype.DECIMAL(10,2)
            },
            category_id: {                              //Foreign Key
                type: Datatype.INTEGER,
                notNull: true
            },
            color_id: {                                 //Foreign Key
                type: Datatype.INTEGER,
                notNull: true
            },
            stock: {
                type: Datatype.INTEGER
            },
            offert: {
                type: Datatype.STRING,
                notNull: true
            },
            created_at: {
                type: Datatype.DATE
            },
            updated_at: {
                type: Datatype.DATE
            }
        }
    const config = {
        timestamps: false,
        //tableName: 'products'
    }

    const Product = Sequelize.define(alias,cols,config)
    return Product
}