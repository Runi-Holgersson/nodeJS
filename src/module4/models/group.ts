import { Model, Sequelize, DataTypes } from 'sequelize';
import { Permissions } from "../types/permissions";

export default class Group extends Model {
    public id?: string;
    declare name?: string;
    public permissions?: Array<Permissions>
}
export const GroupMap = (sequelize: Sequelize) => {
    Group.init({
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255)
        },
        permissions: {
            type: DataTypes.ARRAY
        }
    }, {
        sequelize,
        tableName: 'groups'
    });
    Group.sync();
    console.log(sequelize.models.User);
}