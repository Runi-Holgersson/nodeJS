export const userGroupMockRequestWithParams = {
    body: [
        123, 1, 2
    ],
    params: {
        groupid: "123"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}

export const groupMockValidRequest = {
    body: {
        login: "mockUserLogin",
        password: "mockPassword"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}

export const groupMockRequestWithParams = {
    body: {
        id: "1",
        name: "mockGroupNewName",
        permissions: "READ"
    },
    params: {
        id: "1"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}
