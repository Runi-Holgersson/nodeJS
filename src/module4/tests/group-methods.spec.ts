import {describe, expect, jest, test} from '@jest/globals';
import {Request, Response} from "express";
import Group from "../models/group.model";
import {createGroup, deleteGroup, getGroups, updateGroup} from "../data-access/group.methods";
import {getGroup} from "../data-access/group.methods";
import {invalidUsersMockDB, usersMockDB} from "./mocks/user.mock.DB";
import {logger} from "../utils/logger";
import {userMockRequestWithParams, userMockValidRequest} from "./mocks/user.mock.request";
import {mockResponse} from "./mocks/mock.response";
import {groupsMockDB, invalidGroupsMockDB} from "./mocks/group.mock.DB";
import {groupMockRequestWithParams, groupMockValidRequest} from "./mocks/group.mock.request";


describe("getGroups method", () => {
    beforeEach(() => {
        jest.spyOn(logger, "info").mockReset();
        jest.spyOn(logger, "error").mockReset();
    })
    test("should get list of groups", async () => {
        const findAll = jest.spyOn(Group, "findAll");
        await findAll.mockResolvedValue(groupsMockDB as Group[]);
        await getGroups({} as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(200)
    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(Group, "findAll").mockRejectedValue(invalidGroupsMockDB);
        await getGroups({} as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("getGroup method", () => {
    beforeEach(() => {
        jest.spyOn(logger, "info").mockReset();
        jest.spyOn(logger, "error").mockReset();
    })
    test("should resolve group, got by id", async () => {
        jest.spyOn(Group, "findByPk").mockResolvedValue({
            id: "1",
            name: "mockGroupName",
            permissions: "READ"
        } as unknown as Group);
        await getGroup({params: {id: "1"}} as unknown as Request, mockResponse as unknown as Response);
        expect(mockResponse.json).toBeCalledWith({"group": {"id": "1", "name": "mockGroupName",
                "permissions": "READ"}});
    })
    test("should return status 500 if gets request rejected", async () => {
        const findAll = jest.spyOn(Group, "findByPk");
        await findAll.mockRejectedValue(Error);
        await getGroup({} as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("createGroup method", () => {
    test("should create new Group", async () => {
        jest.spyOn(Group, "create").mockResolvedValue({
            dataValues: {
                id: "1",
                name: "mockGroupName",
                permissions: "READ"
            }
        });
        await expect(createGroup(groupMockValidRequest as unknown as Request, mockResponse as unknown as Response)).resolves;
        await expect(mockResponse.json).toBeCalledWith({"group": {"id": "1", "name": "mockGroupName",
                "permissions": "READ"}});
    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(Group, "create").mockRejectedValue(Error);
        await expect(createGroup(groupMockValidRequest as unknown as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("updateUser method", () => {
    test("should update user, got by id", async () => {
        jest.spyOn(Group, "findByPk").mockResolvedValue({
            id: "1",
            name: "mockGroupName",
            permissions: "READ",
            update: jest.fn( (newGroup) => {
                return ({dataValues: newGroup})
            })
        } as unknown as Group);
        await updateGroup(groupMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(201);
        await expect(mockResponse.json).toBeCalledWith({"group": {"id": "1", "name": "mockGroupNewName",
                "permissions": "READ"}});

    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(Group, "findByPk").mockRejectedValue(null);
        await expect(updateGroup(groupMockRequestWithParams as unknown as Request, mockResponse as unknown as Response)).rejects;
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

describe("deleteUser method", () => {
    test("should delete group, got by id", async () => {
        jest.spyOn(Group, "findByPk").mockResolvedValue({
            destroy: jest.fn()
        } as unknown as Group);
        await deleteGroup(groupMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(200);
        await expect(mockResponse.json).toBeCalledWith({"group": "Group with id 1 has been deleted"});

    })
    test("should return status 500 if gets request rejected", async () => {
        jest.spyOn(Group, "findByPk").mockRejectedValue(null);
        await deleteGroup(userMockRequestWithParams as unknown as Request, mockResponse as unknown as Response);
        await expect(mockResponse.status).toBeCalledWith(500)
    })
})

afterAll( done => {
    done();
})
