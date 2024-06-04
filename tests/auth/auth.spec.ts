import * as request from 'supertest';
import {server} from "../server";

describe("Login fail tests", () => {
    it("should FAIL with wrong e-mail", async () => {
        const {
            body: {message},
        } = await request(server.http)
            .post("/auth/login")
            .set("Accept", "application/json")
            .send({
                email: "notsuperadmin@example.com",
                password: process.env.SUPERADMIN_PASSWORD,
            })
            .expect("Content-Type", /json/)
            .expect(404);

        expect(message).toBe('User not found');
    });

    it("should FAIL with wrong password", async () => {
        const {
            body: {message},
        } = await request(server.http)
            .post("/auth/login")
            .set("Accept", "application/json")
            .send({
                email: "superadmin@example.com",
                password: '123123123',
            })
            .expect("Content-Type", /json/)
            .expect(401);
        expect(message).toBe('Invalid credentials');
    });
});
describe("Login success test", () => {
    it("should SUCCEED with correct credentials", async () => {
        const {
            body: { access_token },
        } = await request(server.http)
            .post("/auth/login")
            .set("Accept", "application/json")
            .send({
                email: "superadmin@example.com",
                password: process.env.SUPERADMIN_PASSWORD,
            })
            .expect("Content-Type", /json/)
            .expect(201);

        expect(access_token).toBeDefined();
    });
});

describe("Register tests", () => {
    it("should SUCCEED with valid data", async () => {
        const {
            body: { id, email },
        } = await request(server.http)
            .post("/auth/register")
            .set("Accept", "application/json")
            .send({
                email: "newuser@example.com",
                password: "strongpassword",
                firstname: "John",
                lastname: "Doe",
            })
            .expect("Content-Type", /json/)
            .expect(201);

        expect(id).toBeDefined();
        expect(email).toBe("newuser@example.com");
    });

    it("should FAIL with existing email", async () => {
        const {
            body: { message },
        } = await request(server.http)
            .post("/auth/register")
            .set("Accept", "application/json")
            .send({
                email: "superadmin@example.com",
                password: "strongpassword",
                firstname: "John",
                lastname: "Doe",
            })
            .expect("Content-Type", /json/)
            .expect(500);

        expect(message).toContain('Failed to save user: QueryFailedError: duplicate key value violates unique constraint');
    });
});