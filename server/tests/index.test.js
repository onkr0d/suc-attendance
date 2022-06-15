const app = require("../index")
const request = require("supertest")

describe("get clubs list", () => {
    test("GET /api/clubs", async () => {
        request(app)
            .get("/api/clubs")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            })
    })

})

afterAll(async () => {
    app.close()
})

