module.exports = (Sequelize, Datatype) => {
    const alias = 'File'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            url: {
                type: Datatype.STRING,
                notNull: true
            }
        }
    const config = {
        timestamps: false,
        paranoid: false
    }

    const File = Sequelize.define(alias,cols,config)

    File.associate = function(models) {
        File.belongsToMany(models.Product, {
            as: 'products',
            through: 'product_file',
            foreignKey: 'file_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }



    return File
}