process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Atendimento = require('../models/atendimento');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Atendimento', () => {
  beforeEach((done) => { //Before each test we empty the database
    Atendimento.remove({}, (error) => {
     done();
    });
  });

  describe('/GET atendimentos', () => {
    it('it deve retornar todos os atendimentos', (done) => {
      chai.request(server)
        .get('/api/atendimentos')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
