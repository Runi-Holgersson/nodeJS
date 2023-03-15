import express from 'express';
import { validateUser  } from "../services/validation.service";
import User from '../models/user.model';
import Group from "../models/group.model";
import { Request, Response } from "express";
import { addUsersToGroup } from "../data-access/user-group.methods";
import { logger } from "../utils/logger";
import { loginUser } from "../services/login.service";
import { refreshToken } from "../services/refresh-token.service";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../data-access/user.methods";

export const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUser);

usersRouter.post('/users', validateUser, createUser);

usersRouter.put('/users/:id', validateUser, updateUser);

usersRouter.delete('/users/:id', deleteUser);

usersRouter.post('/usersgroup/:groupid', addUsersToGroup);

usersRouter.post('/login', loginUser);

usersRouter.post('/token', refreshToken);