import { Model, Sequelize, DataTypes } from 'sequelize';
import GroupModel from "./group.model";

export default class UserModel extends Model {
    public id?: string;
    public login?: string;
    public password?: string;
    public age?: number;
    public isdeleted?: boolean
}

export const UserMap = (sequelize: Sequelize) => {
    UserModel.init({
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING(255)
        },
        password: {
            type: DataTypes.STRING(100)
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isdeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    UserModel.sync();
    /*UserModel.belongsToMany(GroupModel, {
        through: "user_group",
        as: "users",
        foreignKey: "group_id"
    })*/
}



