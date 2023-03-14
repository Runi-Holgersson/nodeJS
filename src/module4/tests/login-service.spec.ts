import {describe, expect, jest, test} from '@jest/globals';
import {loginUser} from "../services/login.service";
import {Request, Response} from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const mockValidRequest = {
    body: {
        login: "mockUserLogin",
        password: "mockPassword"
    },
    headers: {
        "x-access-token": "mockToken"
    }
}

const mockUnvalidRequest: Partial<Request> = {
    body: {
        login: "mockUserLogin",
    },
    headers: {
        "x-access-token": "mockToken"
    }
}
afterAll(done => {
    done();
})

describe('loginUser service', () => {
    afterAll(done => {
        done();
    })
    test('should return error if request has not all required fields', async () => {
      await expect(loginUser({body: {login: "mockUserLogin"}} as Request, {} as Response)).rejects.toThrowError();
    })
    it('should call findUser in User model if request has all required fields', async () => {
        const findUser = await jest.spyOn(User, "findOne");
        await loginUser({
            body: {
                login: "mockUserLogin",
                password: "123"
            }
        } as Request, {} as Response);
        expect(findUser).toBeCalled();
    })
    it('should call findUser in User model if request has all required fields', async () => {
        const sign = jest.spyOn(jwt, "sign");
        await sign.mockImplementation(() => "mockToken");
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const mockRequest = {body: {login: "mockUserLogin", password: "123"}};
        const findUser = jest.spyOn(User, "findOne").mockResolvedValue({
            login: "mockUserLogin",
            password: "123"
        } as User);
        await findUser.getMockImplementation();
        await loginUser(mockRequest as Request, mockResponse as unknown as Response);
        //expect(res.status).toBe(200);
        expect(sign).toBeCalledTimes(2);
        //await expect(loginUser(req as Request, res as Response)).resolves;
    })
})