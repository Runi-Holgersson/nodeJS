import { Sequelize } from 'sequelize';
export default new Sequelize({
    dialect: "postgres",
    host: 'localhost',
    port: 5432,
    database: 'module3',
    username: 'postgres',
    password: 'RuniDB',
});