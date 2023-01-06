import express from 'express';
import {getUsers, getUser, updateUser, deleteUser, createUser, getAutoSuggestUsers} from '../middlewares/methods';
import {User} from "../models/user";
//import {schema} from "../db/validation";
import Joi from "joi";

const schema = Joi.object(
    {
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
        age: Joi.number().min(4).max(130).required(),
        isDeleted: Joi.boolean().required()
    }
)

export const router = express.Router();

/* All users */
router.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err })
    }
})

/* Get user by id */
router.get('/users/:id', async (req, res) => {
    try {
        const id: any = req.params.id;
        const user = await getUser(id);
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err});
    }
})

/* Update user by id */
router.put('/users/:id', async (req, res) => {
    try {
        const result = schema.validate(req.body);
        if (!result.error) {
            const id: any = req.params.id;
            const users = await updateUser(id, req.body)
            res.json(users);
        } else {
            res.status(400).json({ message: result.error.message});
        }
    } catch (err) {
        res.status(500).json({ message: err});
    }
})

/* Soft delete user by id */
router.delete('/users/:id', async (req, res) => {
    try {
        const id: any = req.params.id;
        const users = await deleteUser(id);
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err })
    }
})

/* Create user */
router.post('/users', async (req, res) => {
    try {
        const result = schema.validate(req.body);
        if (!result.error) {
            const users: User[] =  await createUser(req.body);
            res.json(users);
        } else {
            res.status(400).json({ message: result.error.message});
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
})

/* Search users list by queries */
router.get('/search', async (req, res) => {
    try {
        const substring: any = req.query.substring;
        const limit: any = req.query.limit;
        const user = await getAutoSuggestUsers(substring, limit);
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err });
    }
})



