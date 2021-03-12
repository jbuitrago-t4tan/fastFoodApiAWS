const request = require('supertest');
const dynamodbHelper = require('./dynamodbHelper');
const app = require('../instance');
const expect = require('chai').expect;
const sinon = require('sinon');


describe('API — fastFood', () => {
  const server = request('http://localhost:3000');
  
  describe('POST /dev/api/fastfood/ticket/test', () => {

    it('POST /api/fastfood/ticket/test', (done) => {
      server.post('/dev/api/fastfood/ticket/test')
        .expect(200)
        .end((error, result) => {
          if (error) return done(error);
          expect(result.body).to.deep.eq(
           { ok: true, statusCode: 200, result: {} }
          );
          return done();
        });
     });
  });
  
   describe('POST /dev/api/fastfood/ticket/test', () => {
    const enpointRoute = `/dev/api/fastfood/ticket/test`;
    const validInput = {body:{menuName:'asd@asd.com', menuPrice: 4000}};
    it('should return a 200 status code', async () => {
      const res = await request('http://localhost:3000')
        .post(enpointRoute)
        .send(validInput.body)
      expect(res.status).to.eql(200);
    });
  });

});
