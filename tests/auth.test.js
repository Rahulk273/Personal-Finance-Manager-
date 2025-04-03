const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("Auth API", () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clean DB before tests start
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close DB connection after tests
    });

    it("should register a user without returning a token", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({ name: "Test User", email: "test@example.com", password: "test123" });

        console.log("🟢 Register API Response:", res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User registered successfully");
        expect(res.body).not.toHaveProperty("token"); // Ensure token is NOT included
    });

    it("should login and return a token", async () => {
        // Register the user first
        await request(app)
            .post("/api/auth/register")
            .send({ name: "Test User", email: "test@example.com", password: "test123" });

        // Login the user
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "test@example.com", password: "test123" });

        console.log("🟢 Login API Response:", res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user).toHaveProperty("name", "Test User");
        expect(res.body.user).toHaveProperty("email", "test@example.com");
    });
});
