import { Model, DataTypes } from 'sequelize';
import sequelize from './db';
class User extends Model {
    public id?: string;
    public login?: string;
    public password?: string;
    public age?: number;
    public isdeleted?: boolean
}
User.init({
    id: {
        type: DataTypes.INTEGER,
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
User.sync();
export default User;