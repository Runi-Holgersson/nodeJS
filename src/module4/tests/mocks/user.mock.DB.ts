import User from "../../models/user.model";

export const usersMockDB = [
    {
        id: "1",
        login: "mockUserLogin",
        password: "mockPassword",
        age: 12,
        isdeleted: false
    },
    {
        id: "2",
        login: "mockUserLogin2",
        password: "mockPassword",
        age: 13,
        isdeleted: false
    },
    {
        id: "3",
        login: "mockUserLogin3",
        password: "mockPassword",
        age: 14,
        isdeleted: false
    }
]

export const invalidUsersMockDB = [
    {
        id: "1",
        name: "mockUserLogin",
        password: "mockPassword",
        age: 12,
        isdeleted: false
    },
    {
        password: "mockPassword",
        age: 13,
        isdeleted: false
    }
]