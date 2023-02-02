import { Model, Sequelize, DataTypes } from 'sequelize';
import GroupModel from "./group.model";
import UserModel from "./user.model";

export default class UserGroupModel extends Model {
    public groupId?: number;
    public userId?: number
}

export const UserGroupMap = (sequelize: Sequelize) => {
    UserGroupModel.init(
        {
            groupId: {
                type: DataTypes.INTEGER,
                references: {
                    model: GroupModel,
                    key: 'id'
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: 'id'
                }
            }
        },
         {
        sequelize,
        tableName: 'user_group',
        timestamps: false
    });
    UserGroupModel.sync();
}