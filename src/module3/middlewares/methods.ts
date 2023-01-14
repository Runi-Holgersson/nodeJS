import users from '../db/users.json';
import {User} from '../types/user';
import fs from "fs";
import {pool} from "../db/queries";
import {Request, Response} from "express";
//import {schema} from "../db/validation";
import {DatabaseError, QueryResult} from "pg";
import Joi from "joi";
const schema = Joi.object(
    {
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
        age: Joi.number().min(4).max(130).required(),
        isDeleted: Joi.boolean()
    }
)

//const filepath = path.join(process.cwd(), 'src', 'module2', 'db', 'users.json');
const filepath = require.resolve('../db/users.json');

export function findUser(users: User[], id: string): User {
        const user = users.find(r => r.id == id)
        if (!user) {
            throw new Error ('no user with this ID exists');
        } else {
            return (user);
        }
}

export async function getUsers (req: Request, res: Response){
    try {
        const users = await pool.query('SELECT * FROM public.users ORDER BY id ASC');
        res.status(200).json(users.rows);
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

export async function getUser (req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).json(user.rows);
    } catch(err) {
        res.status(500).json({ message: err });
    }
}
/*export async function getUsers(): Promise<User[]>  {
    if (users.length === 0) {
        throw new Error('no users available')
    } return users;
}
export async function getUser(id: any): Promise<User> {
    return findUser(users, id);
}

export async function updateUser(id: any, newData: Partial<User>): Promise<User[]> {
    const user = await findUser(users, id);
    const index = users.findIndex(data => data.id == user.id);
    users[index] = {...user, ...newData};
    await fs.promises.writeFile(filepath, JSON.stringify(users))
    return users;
}
export async function createUser(user: User): Promise <User[]> {
    users.push(user);
    console.log(users);
    await fs.promises.writeFile(filepath, JSON.stringify(users));
    // fs.writeFileSync(filepath, JSON.stringify(users), 'utf8');
    return users;
}
*/

export async function updateUser(req: Request, res: Response) {
    try {
        const result = schema.validate(req.body);
        if (!result.error) {
            const id = parseInt(req.params.id);
            const { login, password, age, isDeleted } = req.body;
            await pool.query('UPDATE users SET login = $1, password = $2, age = $3, isDeleted = $4 WHERE id = $5',
                [login, password, age, isDeleted, id]);
            res.status(200).json(`User with id ${ id } had been updated`);
        } else {
            res.status(400).json({ message: result.error.message });
        }
    } catch (err) {
        res.status(500).json({ message: err});
    }
}

export async function deleteUser(id: any): Promise<User[]> {
    const user = await findUser(users, id);
    const index = users.findIndex(data => data.id == user.id);
    users[index].isDeleted = true;
    await fs.promises.writeFile(filepath, JSON.stringify(users));
    return users;
}

export async function createUser(req: Request, res: Response) {
    try {
        const result = schema.validate(req.body);
        if (!result.error) {
            const { id, login, password, age, isDeleted } = req.body;
            await pool.query('INSERT INTO users ( id, login, password, age, isDeleted ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [ id, login, password, age, isDeleted ]);
            res.status(201).json(`User with id ${ id } had been created`);
        } else {
            res.status(400).json({ message: result.error.message});
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
}
//remove Promises
export async function getAutoSuggestUsers(loginSubstring: string, limit = 3) {
    const suggestedUsers =await users.filter(user => user.login.includes(loginSubstring));
    if (suggestedUsers.length > limit) {
        return (suggestedUsers.slice(0, limit-1));
    } else {
        return suggestedUsers;
    }
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    getAutoSuggestUsers
}
