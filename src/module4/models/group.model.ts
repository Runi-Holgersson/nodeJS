import { Model, DataTypes, ForeignKey } from 'sequelize';
import { Permissions } from "../types/permissions";
import sequelize from './db';
class Group extends Model {
    public id?: string;
    declare name?: string;
    public permissions?: Array<Permissions>;
    public user_id?: ForeignKey<string>;
}
Group.init({
    id: {
        type: DataTypes.INTEGER,
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
Group.sync()
export default Group;