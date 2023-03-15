import User from "../models/user.model";
import Group from "../models/group.model";
import UserGroup from "../models/user-group.model";
import sequelize from "../models/db";
import {logger} from "../utils/logger";
import {Request, Response} from "express";

export async function addUsersToGroup( req: Request, res: Response) {
try {
    const userIds: any[] = req.body;
    const groupId = Number(req.params.groupid);
    logger.info( `called addUsersToGroup method with arguments groupId: ${groupId} userIds: ${userIds}`,
        {service: "data-access methods"});
    await sequelize.transaction(async function (transaction) {
        User.belongsToMany(Group, {through: UserGroup, onDelete: "cascade"});
        Group.belongsToMany(User, {through: UserGroup, onDelete: "cascade"});
        const group = await Group.findByPk(groupId);
        if (!group) {
            logger.error(`no group with id ${groupId} exists`, {service: "data-access methods"});
            throw new Error(`no group with id ${groupId} exists`);
        } else {
            let userGroup: any[] = [];
            for (const userID of userIds) {
                userGroup.push({
                    UserId: userID,
                    GroupId: groupId
                });
            }
            await UserGroup.bulkCreate(userGroup, {transaction});
            logger.info(`users with userIds: ${userIds} been added to group: ${groupId}`,
                {service: "data-access methods"});
            const result = await Group.findByPk(groupId, {include: User});
            res.status(201).json({ group: result });
        }
    })
} catch(err) {
    logger.error(`Internal Server Error: ${err}`);
    res.status(500).json({ message: err });
}
}