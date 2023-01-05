import express from 'express';
import {getUsers, getUser, updateUser, deleteUser, createUser, getAutoSuggestUsers} from '../middlewares/methods';
import {User} from "../models/user";
import url, {URL} from "url";
import fs from "fs";
import users from "../db/users.json";

export const router = express.Router();
const testUpdateData: Partial<User> = { password: 'testPassword', age: 111 };
const testCreateUser: User = { id: "666", login: 'brand new user', password: 'testPassword', age: 111, isDeleted: false };
const filepath = '../users.json';
/* All users */
router.get('/users', async (req, res) => {
    await getUsers()
        .then(users => res.send(users))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Get user by id */
router.get('/users/:id', async (req, res) => {
        const id: any = req.params.id;
        await getUser(id)
            .then(user => res.json(user))
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message })
                } else {
                    res.status(500).json({ message: err.message })
                }
            })
})

/* Update user by id */
router.put('/users/:id', async (req, res, next) => {
    const id: any = req.params.id;
    await updateUser(id, testUpdateData)
        .then(user => res.json(user))
        .catch(err => {
            res.json({ message: err.message })
        })
    next();
})

/* Soft delete user by id */
router.delete('/users/:id', async (req, res, next) => {
    const id: any = req.params.id;
    await deleteUser(id)
        .then(user => res.json(user))
        .catch(err => {
            res.json({ message: err.message })
        })
    next();
})

/* Create user */
router.post('/users', async (req, res, next) => {
    await createUser(req.body)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
    next();
})

/* Search users list by queries */
router.get('/search', async (req, res) => {
    const substring: any = req.query.substring;
    const limit: any = req.query.limit;
    await getAutoSuggestUsers(substring, limit)
        .then(user => res.json(user))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})



