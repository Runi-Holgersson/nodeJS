import {Sequelize} from "sequelize";
import User from "../models/user.model";
import Group from "../models/group.model";
import UserGroup from "../models/user-group.model";
import sequelize from "../models/db";

const t = async (sequelize:Sequelize) => {
    await sequelize.transaction();
}

export async function addUsersToGroup(groupId: number, userIds: any[]) {
try {
        User.belongsToMany(Group, { through: UserGroup, onDelete: "cascade" });
        Group.belongsToMany(User, { through: UserGroup, onDelete: "cascade" });
        const group = await Group.findByPk(groupId);
        if (!group) {
            throw new Error(`no group with id ${groupId} exists`);
        } else {
            let userGroup: any[] = [];
            for (const userID of userIds) {
                userGroup.push({
                    UserId: userID,
                    GroupId: groupId
                });
            }
            await UserGroup.bulkCreate(userGroup);
            return Group.findByPk(groupId, {include: User});
    }
} catch(err) {
    return err;
}
}