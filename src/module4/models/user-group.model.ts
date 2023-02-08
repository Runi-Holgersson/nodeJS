import { Model, DataTypes } from 'sequelize';
import sequelize from './db';
import Group from "./group.model";
import User from "./user.model";
class UserGroup extends Model {}
UserGroup.init(
    {
        GroupId: {
            type: DataTypes.INTEGER,
            references: {
                model: Group,
                key: 'id'
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'user_group',
        timestamps: false
    });
UserGroup.sync()
export default UserGroup;