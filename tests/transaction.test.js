const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

let token = "";
let userId = ""; // Store the user ID for transaction association

describe("Transaction API", () => {
    beforeAll(async () => {
        // Clean the database before tests
        await User.deleteMany();
        await Transaction.deleteMany();

        // 🟢 Register a new user
        const registerRes = await request(app)
            .post("/api/auth/register")
            .send({ name: "Test User", email: "test@example.com", password: "test123" });

        console.log("🟢 Register Response:", registerRes.body);

        // 🟢 Login and get token
        const loginRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "test@example.com", password: "test123" });

        console.log("🟢 Login Response:", loginRes.body);

        token = loginRes.body.token;
        userId = loginRes.body.user?._id; // Ensure userId is correctly assigned

        expect(token).toBeDefined();
        expect(userId).toBeDefined();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a transaction", async () => {
        const res = await request(app)
            .post("/api/transactions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                userId: userId,  // ✅ Include userId explicitly
                amount: 100,
                type: "expense",
                category: "Food",
                description: "Lunch",
                date: "2024-04-01",
            });

        console.log("🟢 Create Transaction Response:", res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Transaction added");
        expect(res.body.transaction).toHaveProperty("_id");
        expect(res.body.transaction).toHaveProperty("amount", 100);
        expect(res.body.transaction).toHaveProperty("userId", userId);
    });

    it("should fetch all transactions", async () => {
        const res = await request(app)
            .get("/api/transactions")
            .set("Authorization", `Bearer ${token}`);

        console.log("🟢 Fetch Transactions Response:", res.body);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
