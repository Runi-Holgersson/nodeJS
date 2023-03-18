import {Request, Response} from "express";
import {logger} from "../utils/logger";
import Group from "../models/group.model";

export async function getGroups( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const result = await Group.findAll({
        });
        res.status(200).json({ groups: result });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json(`message: ${err}`);
    }
}

export async function getGroup ( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const id = Number(req.params.id);
        const result = await Group.findByPk(id);
        console.log(result);
        res.status(200).json({ group: result });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json({ message: err });
    }
}

export async function createGroup ( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        let newGroup = req.body;
        const result = await Group.create(newGroup);
        newGroup = result.dataValues as Group;
        res.status(201).json({ group: newGroup });
    } catch(err) {
        logger.error(`Internal Server Error: ${err}`);
        res.status(500).json(err);
    }
}

export async function updateGroup ( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        let newGroup = req.body;
        const id = Number(req.params.id);
        const group = await Group.findByPk(id);
        if(!group){
            res.status(404).json({ message: `No groups with id ${id} exist`});
        } else {
            const result = await group.update(newGroup);
            newGroup = result.dataValues as Group;
            res.status(201).json({ group: newGroup });
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`)
        res.status(500).json({ message: err });
    }
}

export async function deleteGroup ( req: Request, res: Response ) {
    try {
        logger.info({
            message: `called method ${req.method} url ${req.url}`,
        })
        const id = Number(req.params.id);
        const group = await Group.findByPk(id);
        if (!group) {
            res.status(404).json({message: `No groups with id ${id} exist`});
        } else {
            await group.destroy();
            res.status(200).json({group: `Group with id ${id} has been deleted`});
        }
    } catch (err) {
        logger.error(`Internal Server Error: ${err}`)
        res.status(500).json({ message: err });
    }
}