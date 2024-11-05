const { userLogin } = require("../backend/controllers/authController");
const db = require('../backend/database/models/index');
const User = db.models.User;
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');

describe('UserLogin', () => {
    it('should respond with 404 when user is not found or registered', async () => {
        const testUserReqObject = httpMocks.createRequest({
            method: 'POST',
            url: 'auth/login',
            body: {
                username: 'unregisteredUser',
                password: 'myPassword123!',
            },
        });

        const res = httpMocks.createResponse();
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await userLogin(testUserReqObject, res);

        expect(res.statusCode).toBe(404); 
        expect(res._getData()).toContain('User not found'); 

        User.findOne.mockRestore();
    });

    it('should respond with 401 when user enters wrong password', async () => {
        const testUserReqObject = httpMocks.createRequest({
            method: 'POST',
            url: 'auth/login',
            body: {
                username: 'registeredUser',
                password: 'wrongPassword',
            },
        });

        const res = httpMocks.createResponse();
        const mockUser = {
            username: 'registeredUser',
            password: await bcrypt.hash('correctPassword', 10)
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await userLogin(testUserReqObject, res);

        expect(res.statusCode).toBe(401); 
        expect(res._getData()).toContain('Incorrect password'); 

        User.findOne.mockRestore();
    });
});



