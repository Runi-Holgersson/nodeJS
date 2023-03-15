import {describe, expect, jest, test} from '@jest/globals';
import {Request, Response} from "express";
import User from "../models/user.model";
import {getUsers} from "../data-access/user.methods";
import {invalidUsersMockDB, usersMockDB} from "./mocks/user.mockDB";
import {logger} from "../utils/logger";
// TODO doesn't work(
beforeEach(() => {
    jest.spyOn(logger, "info").mockReset();
    jest.spyOn(logger, "error").mockReset();
})

describe("getUsers method", () => {
    test("should get list of users", async () => {
        jest.spyOn(logger, "info").mockReset();
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const findAll = jest.spyOn(User, "findAll");
        await findAll.mockResolvedValue(usersMockDB as User[]);
        await expect(getUsers({} as Request, mockResponse as unknown as Response)).resolves;
        await expect(mockResponse.status).toBeCalledWith(200)
    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(logger, "error").mockReset();
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const findAll = jest.spyOn(User, "findAll");
        await findAll.mockRejectedValue(invalidUsersMockDB);
        await expect(getUsers({} as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})


