import express from 'express';
import {getUsers, getUser, updateUser, deleteUser, createUser, getAutoSuggestUsers} from '../data-access/methods';
import {validateUser} from "../services/validation.service";

export const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.put('/users/:id', validateUser, updateUser);

router.delete('/users/:id', deleteUser);

router.post('/users', validateUser, createUser);

router.get('/search', getAutoSuggestUsers);



