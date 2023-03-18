export const groupsMockDB = [
    {
        id: "1",
        name: "mockGroupName",
        permissions: ["READ"]
    },
    {
        id: "2",
        name: "mockGroupName",
        permissions: ["READ"]
    },
    {
        id: "3",
        name: "mockGroupName",
        permissions: ["READ"]
    }
]

export const invalidGroupsMockDB = [
    {
        id: 1,
        name: "mockGroupName",
        permissions: ["READ"]
    },
    {
        id: "2",
        permissions: ["READ"]
    },
    {
        id: "3",
        name: "mockGroupName"
    }
]