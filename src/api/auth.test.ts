import * as authAPi from "./auth.api";

describe('Auth api tests', () => {
    beforeEach(() => {
        jest.spyOn(authAPi, 'loadMe').mockReturnValue(Promise.resolve({
          "createdAt": "2023-08-24T11:33:12.785000+00:00",
          "id": 2,
          "email": "user1",
          "passwordHash": "$2b$12$rugyEepBqlNl.Led98JDeOYiLgMIIBKxtCOM2URClYWSDACWQtbpm",
          "move": [],
          "games": []
        }))
    })
    it('returns the user if token is valid', async () => {
        const user = await authAPi.loadMe('a-token')
        expect(user.id).toEqual(2)
        expect(user.email).toEqual('user1')
    })
})