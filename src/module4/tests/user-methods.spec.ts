import {describe, expect, jest, test} from '@jest/globals';
import {Request, Response} from "express";
import User from "../models/user.model";
import {createUser, deleteUser, getUsers, updateUser} from "../data-access/user.methods";
import {getUser} from "../data-access/user.methods";
import {invalidUsersMockDB, usersMockDB} from "./mocks/user.mock.DB";
import {logger} from "../utils/logger";
import {userMockRequestWithParams, userMockValidRequest} from "./mocks/user.mock.request";
import {mockResponse} from "./mocks/mock.response";

// TODO doesn't work(
beforeEach(() => {
    jest.spyOn(logger, "info").mockReset();
    jest.spyOn(logger, "error").mockReset();
})

describe("getUsers method", () => {
    test("should get list of users", async () => {
        const findAll = jest.spyOn(User, "findAll");
        await findAll.mockResolvedValue(usersMockDB as User[]);
        await expect(getUsers({} as Request, mockResponse as unknown as Response)).resolves;
        await expect(mockResponse.status).toBeCalledWith(200)
    })
    test("should return status 500 if gets request rejected", async () => {
        const findAll = jest.spyOn(User, "findAll");
        await findAll.mockRejectedValue(invalidUsersMockDB);
        await expect(getUsers({} as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("getUser method", () => {
    test("should resolve user, got by id", async () => {
        jest.spyOn(User, "findByPk").mockResolvedValue({
            login: "mockUserLogin",
            password: "123"
        } as User);
        await expect(getUser({params: '1'} as unknown as Request, mockResponse as unknown as Response)).resolves;
        expect(mockResponse.json).toBeCalledWith({"user": {"login": "mockUserLogin",
                "password": "123"}});
    })
    test("should return status 500 if gets request rejected", async () => {
        const findAll = jest.spyOn(User, "findByPk");
        await findAll.mockRejectedValue(Error);
        await expect(getUser({} as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("createUser method", () => {
    test("should resolve user, got by id", async () => {
        jest.spyOn(User, "create").mockResolvedValue({
            dataValues: {
                login: "mockUserLogin",
                password: "123"
            }
        });
        await expect(createUser(userMockValidRequest as unknown as Request, mockResponse as unknown as Response)).resolves;
        await expect(mockResponse.json).toBeCalledWith({"user": {"login": "mockUserLogin",
                "password": "123"}});
    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(User, "create").mockRejectedValue(Error);
        await expect(createUser(userMockValidRequest as unknown as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("updateUser method", () => {
    test("should update user, got by id", async () => {
        jest.spyOn(User, "findByPk").mockResolvedValue({
            id: "123",
            login: "mockUserLogin",
            password: "123",
            update: jest.fn( (newUser) => {
                return ({dataValues: newUser})
            })
        } as unknown as User);
        await updateUser(userMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(201);
        await expect(mockResponse.json).toBeCalledWith({"user": {"id": "123", "login": "mockUserNewLogin",
                "password": "mockNewPassword"}});

    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(User, "findByPk").mockRejectedValue(null);
        await expect(updateUser(userMockRequestWithParams as unknown as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("deleteUser method", () => {
    test("should delete user, got by id", async () => {
        jest.spyOn(User, "findByPk").mockResolvedValue({
            destroy: jest.fn()
        } as unknown as User);
        await deleteUser(userMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(200);
        await expect(mockResponse.json).toBeCalledWith({"user": "User with id 123 has been deleted"});

    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(User, "findByPk").mockRejectedValue(null);
        await deleteUser(userMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

afterAll( done => {
    done();
})


