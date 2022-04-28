module.exports = (Sequelize, Datatype) => {
    const alias = 'User'
    const cols = {
            id: {
                type: Datatype.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: Datatype.STRING,
            },
            lastName: {
                type: Datatype.STRING,
            },
            email: {
                type: Datatype.STRING,
                notNull: true
            },
            password: {
                type: Datatype.STRING,
                notNull: true
            },
            img_id: {                                 //Foreign Key
                type: Datatype.INTEGER,
                notNull: true
            },
            isAdmin: {
                type: Datatype.STRING,
                notNull: true
            },
            isActive: {
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
        //tableName: 'users'
    }

    const User = Sequelize.define(alias,cols,config)
    return User
}


    
    
