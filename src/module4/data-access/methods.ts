import GroupModel from "../models/group.model";
import UserModel from "../models/user.model";

export async function addUsersToGroup(groupId: string, userIds: string[]) {
try {
    const group = await GroupModel.findByPk(groupId);
    if (!group) {
        throw new Error(`no group with id ${groupId} exists`);
    } else {
        let users = [];
        await userIds.forEach(id => UserModel.findByPk(id));
    }
} catch(err) {
    return err;
}
}