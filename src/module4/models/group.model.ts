import { Model, Sequelize, DataTypes } from 'sequelize';
import { Permissions } from "../types/permissions";
import UserModel from "./user.model";

export default class GroupModel extends Model {
    public id?: string;
    declare name?: string;
    public permissions?: Array<Permissions>
}

export const GroupMap = (sequelize: Sequelize) => {
    GroupModel.init({
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255)
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        sequelize,
        tableName: 'groups',
        timestamps: false
    });
    GroupModel.sync();
    /*GroupModel.belongsToMany(UserModel, {
        through: "user_group",
        as: "groups",
        foreignKey: "user_id"
    })*/
}