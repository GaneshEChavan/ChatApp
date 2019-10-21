const server = require("../backend/server");
const chai = require("chai");
const chaiHttp = require("chai-http")
const json = require("./test.json")
const expect = require('chai').expect
chai.use(chaiHttp);
chai.should()

describe("Test for update note API",function(){
  it("test for correct info",function(done){
    chai.request(server)
    .put('/note')
    .set('token',json.token.token)
    .send(json.update)
    .end(function(err,res){
        res.should.have.status(202);
        // res.should.not.exist(err);
        res.should.be.an('object')
        expect(res).to.have.any.keys('status', 'message','data')
        done()
    })
  })
})