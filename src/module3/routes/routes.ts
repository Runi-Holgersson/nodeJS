import express from 'express';
import {getUsers, getUser, updateUser, deleteUser, createUser, getAutoSuggestUsers} from '../middlewares/methods';
import {User} from "../types/user";
import {pool} from "../db/queries";
//import {schema} from "../db/validation";
import Joi from "joi";

//add validation schema
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
router.get('/users', getUsers);

/* Get user by id */
router.get('/users/:id', getUser);

/* Update user by id */
router.put('/users/:id', updateUser);

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
router.post('/users', createUser);

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



