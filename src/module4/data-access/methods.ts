import GroupModel from "../models/group.model";
import UserModel from "../models/user.model";
import {Sequelize} from "sequelize";

const t = async (sequelize:Sequelize) => {
    await sequelize.transaction();
}

export async function addUsersToGroup(groupId: string, userIds: string[]) {
try {
    const group = await GroupModel.findByPk(groupId);
    if (!group) {
        throw new Error(`no group with id ${groupId} exists`);
    } else {
        for (const userID of userIds) {
           const user = await UserModel.findByPk(userID);
           if (user) {
            // await user.addGroup()
           }
        }
    }
} catch(err) {
    return err;
}
}