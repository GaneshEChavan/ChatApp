const server = require("../backend/server");
const chai = require("chai");
const chaiHttp = require("chai-http")
const json = require("./test.json")
const expect = chai.expect

chai.use(chaiHttp);
chai.should()

describe("Test for update note API",function(){
  // it("test for correct info",function(done){
  //   chai.request(server)
  //   .put('/note')
  //   .set('token',json.token.token)
  //   .send(json.update)
  //   .end(function(err,res){
  //       res.should.have.status(202);
  //       should.not.exist(err);
  //       res.should.have.property('data');
  //       res.should.be.an('object');
  //       expect(res).to.have.any.keys('status', 'message','data');
  //       done();
  //   })
  // })

  it("test for wrong token",function(done){
    chai.request(server)
    .put('/note')
    .set('token',json.token2.token)
    .send(json.update)
    .end(function(err,res){
      res.should.have.status(401);
      res.should.be.an('object');
      // should.not.exist(err);
      res.should.have.property('error');
      expect(res).to.have.any.keys('status', 'message','error');
      done();
    })
  })

  // it("test for empty header",function(done){
  //   chai.request(server)
  //   .put('/note')
  //   .set('token',json.token1.token)
  //   .send(json.update)
  //   .end(function(err,res){
  //     // should.exist(res)
  //     res.should.have.status(401);
  //     res.should.be.an('object');
  //     should.not.exist(err);
  //     res.should.have.property('error');
  //     done();
  //   })
  // })
})