export const userMockValidRequest = {
    body: {
        login: "mockUserLogin",
        password: "mockPassword"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}

export const userMockRequestWithParams = {
    body: {
        id: "123",
        login: "mockUserNewLogin",
        password: "mockNewPassword"
    },
    params: {
        id: "123"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}

export const userMockInvalidRequest = {
    body: {
        login: "mockUserLogin",
    },
    headers: {
    }
}