module.exports = (Sequelize, Datatype) => {
    const alias = 'Image'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            url: {
                type: Datatype.STRING,
                notNull: true
            }
        }
    const config = {
        timestamps: false,
        paranoid: false,
        tableName: 'image'
    }

    const Image = Sequelize.define(alias,cols,config)

    Image.associate = function(models) {
        Image.hasMany(models.User, {
            as: 'users',
            foreignKey: 'image_id'
        })
    }


    return Image
}