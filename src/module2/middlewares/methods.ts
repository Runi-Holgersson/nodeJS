import users from '../db/users.json';
import {User} from '../models/user'
import fs, {writeFileSync} from "fs";

const filepath = '../users.json';

export function findUser(users: User[], id: string): Promise <User> {
    return new Promise((resolve, reject) => {
        const user = users.find(r => r.id == id)
        if (!user) {
            reject({
                message: 'no user with this ID exists',
                status: 404
            })
        } else {
            resolve(user)
        }
    })
}

function writeJSONFile(filename: string, content: User[]) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8')
}

export function getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'no users available',
                status: 202
            })
        }
        resolve(users)
    })
}

export function getUser(id: any): Promise<User> {
    return new Promise((resolve, reject) => {
        findUser(users, id)
            .then(user => resolve(user))
            .catch(err => reject(err))
    })
}

export function updateUser(id: any, newData: Partial<User>): Promise<User[]> {
    return new Promise((resolve, reject) => {
        findUser(users, id)
            .then(user => {
                const index = users.findIndex(data => data.id == user.id);
                users[index] = {...user, ...newData};
                fs.writeFileSync(filepath, JSON.stringify(users));
                resolve(users);
            })
            .catch(err => reject(err));
    })
}

export function deleteUser(id: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
        findUser(users, id)
            .then(user => {
                const index = users.findIndex(data => data.id == user.id);
                users[index].isDeleted = true;
                fs.writeFileSync(filepath, JSON.stringify(users), 'utf8');
                resolve((users));
            })
            .catch(err => reject(err));
    })
}

export function createUser(user: User): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
        users.push(user);
        writeFileSync(filepath, JSON.stringify(users), 'utf8');
        resolve(users);
    })
}

export function getAutoSuggestUsers(loginSubstring: string, limit: number = 3) {
    return new Promise<User[]>((resolve, reject) => {
        const suggestedUsers = users.filter((user) => {
            user.login.includes(loginSubstring)
        });
        if (suggestedUsers.length > limit) {
            resolve(suggestedUsers.slice(0, limit-1));
        } else {
            resolve(suggestedUsers);
        }
    })
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    getAutoSuggestUsers
}
