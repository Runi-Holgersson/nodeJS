import {pool} from "../models/db";
import {Request, Response} from "express";
import Joi from "joi";
import {
    GET_USERS,
    GET_USER,
    UPDATE_USER,
    SEARCH_USER,
    CREATE_USER,
    DELETE_USER
} from "../models/queries";

const schema = Joi.object(
    {
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
        age: Joi.number().min(4).max(130).required(),
        isDeleted: Joi.boolean()
    }
)

export async function getUsers (req: Request, res: Response){
    try {
        const users = await pool.query(GET_USERS);
        res.status(200).json(users.rows);
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

export async function getUser (req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const user = await pool.query(GET_USER, [id]);
        if (user.rows.length === 0) {
            res.status(400).json({ message: `no users with ${id} in database` });
        } else {
            res.status(200).json(user.rows);
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

export async function getAutoSuggestUsers(req: Request, res: Response) {
    try {
        const substring: any = req.query.substring;
        const limit: any = req.query.limit;
        const users = await pool.query(SEARCH_USER, [substring, limit]);
        res.status(200).json(users.rows);
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await pool.query(DELETE_USER, [ id ]);
        res.status(200).json(`User with id ${ id } had been deleted`);
    } catch (err) {
        res.status(500).json({ message: err});
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { login, password, age, isDeleted } = req.body;
        await pool.query(UPDATE_USER, [login, password, age, isDeleted, id]);
        res.status(200).json(`User with id ${ id } had been updated`);
    } catch (err) {
        res.status(500).json({ message: err});
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const { id, login, password, age, isDeleted } = req.body;
        await pool.query(CREATE_USER, [ id, login, password, age, isDeleted ]);
        res.status(201).json(`User with id ${ id } had been created`);
    } catch(err) {
        res.status(500).json({ message: err });
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
