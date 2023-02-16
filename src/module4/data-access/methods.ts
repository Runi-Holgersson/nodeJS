import User from "../models/user.model";
import Group from "../models/group.model";
import UserGroup from "../models/user-group.model";
import sequelize from "../models/db";
import {logger} from "../utils/logger";

export async function addUsersToGroup(groupId: number, userIds: any[]) {
try {
    logger.info( `called addUsersToGroup method with arguments groupId: ${groupId} userIds: ${userIds}`,
        {service: "data-access methods"});
    return sequelize.transaction(async function (transaction) {
        User.belongsToMany(Group, { through: UserGroup, onDelete: "cascade" });
        Group.belongsToMany(User, { through: UserGroup, onDelete: "cascade" });
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
            logger.info( `users with userIds: ${userIds} been added to group: ${groupId}`,
                {service: "data-access methods"});
            return Group.findByPk(groupId, {include: User});
        }
    })
} catch(err) {
    return err;
}
}