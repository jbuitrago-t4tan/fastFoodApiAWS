const request = require("supertest");
const app = require("../instance");
const expect = require("chai").expect;
const sinon = require("sinon");
const validateRequest = require('./validateRequest');

describe("API — fastFood", () => {
  const server = request("http://localhost:3000");
  const enpointRoute = `/dev/api/fastfood/ticket/test`;

  describe("POST /dev/api/fastfood/ticket/test", () => {
    it("should return object { ok:true, statusCode: 200, result: {} }", (done) => {
      server
        .post(enpointRoute)
        .expect(200)
        .end((error, result) => {
          if (error) return done(error);
          expect(result.body).to.deep.eq({
            ok: true,
            statusCode: 200,
            result: {},
          });
          return done();
        });
    });
  });

  describe("POST /dev/api/fastfood/ticket/test", () => {
    const validInput = { body: { menuName: "somethinghere", menuPrice: 4000 } };
    it("should return a 200 status code", async () => {
      const res = await request("http://localhost:3000")
        .post(enpointRoute)
        .send(validInput.body);
      expect(res.status).to.eql(200);
    });
  });

  it("should return false in created", async () => {
    const invalidInput = { body: { foo: 'bar' } };
    const res = await request("http://localhost:3000")
    .post(enpointRoute)
    .send(invalidInput.body);
    expect(res.created).to.eql( false );
  });
  
  describe("POST /dev/api/fastfood/ticket/test", () => {
    const invalidInput = { body: { userName: 'NAME', userId: 'USERID' } };
    const undefinedTest = { body: { testName: 'hello worlsd!' }};

    it('should return 403 because userName and userId are not called NAME and USERid', async () => {
      const res = await request("http://localhost:3000")
      .post(enpointRoute)
      .send(invalidInput.body);
      expect(res.status).to.eql(403);
    });

    it('should return a 400 status code', async () => {
      const res = await request("http://localhost:3000")
        .post(enpointRoute)
        .send(undefinedTest.body);
      expect(res.status).to.eql(400);
    });
  });
});


