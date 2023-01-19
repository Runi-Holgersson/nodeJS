import pg from 'pg';

const Pool = pg.Pool;

export const pool  =  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'module3',
    password: 'RuniDB',
    port: 5432,
});