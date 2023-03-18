import {describe, expect, jest, test} from "@jest/globals";
import User from "../models/user.model";
import Group from "../models/group.model";
import {addUsersToGroup} from "../data-access/user-group.methods";
import {userMockRequestWithParams} from "./mocks/user.mock.request";
import sequelize from "../models/db";
import {Request, Response} from "express";
import {mockResponse} from "./mocks/mock.response";
import {userGroupMockRequestWithParams} from "./mocks/group.mock.request";
import UserGroup from "../models/user-group.model";

describe("updateUser method", () => {
    beforeEach(() => {
        jest.spyOn(sequelize, "transaction");
        jest.spyOn(User, "belongsToMany").mock;
        jest.spyOn(Group, "belongsToMany").mock;
        jest.spyOn(UserGroup, "bulkCreate").mock;
    })
    test("should update user, got by id", async () => {
        jest.spyOn(Group, "findByPk").mockResolvedValue({
            id: "1",
            name: "mockGroupLogin",
            permissions: "READ"
        } as unknown as Group);
        await addUsersToGroup(userGroupMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(201);
        //await expect(mockResponse.json).toBeCalledWith({"user": {"id": "123", "login": "mockUserNewLogin",
               // "password": "mockNewPassword"}});

    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(Group, "findByPk").mockRejectedValue(null);
        jest.spyOn(sequelize, "transaction");
        jest.spyOn(User, "belongsToMany").mock;
        jest.spyOn(Group, "belongsToMany").mock;
        jest.spyOn(UserGroup, "bulkCreate").mock;
        await addUsersToGroup(userGroupMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})