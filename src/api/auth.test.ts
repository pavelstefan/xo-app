import {loadMe} from "./auth.api";

describe('Auth api tests', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })
    it('returns the user if token is valid', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            "createdAt": "2023-08-20T09:45:21.246000+00:00",
            "id": 1,
            "email": "test@email.com",
            "passwordHash": "$2b$12$mKOdy12fWHhEGO.WnUu1Gud4EZU1h8jqlfQWFgVVLW0qJJokAGKx.",
            "move": null,
            "games": null
        }));

        const user = await loadMe('a-token')

        expect(user.id).toEqual(1)
        expect(user.email).toEqual('test@email.com')
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/user/me",
            {"headers": {"Authorization": "Bearer a-token"}, "method": "POST"}
        );
    })
})