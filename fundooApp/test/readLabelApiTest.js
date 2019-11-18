const server = require("../backend/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const json = require("./test.json");
const expect = chai.expect

chai.use(chaiHttp);
chai.should();

describe("Test for read Label API", function () {
    it("test for correct token", function (done) {
        chai.request(server)
            .get('/label')
            .set('token', json.token.token)
            .end(function (err, res) {
                // should.exist(res);
                // should.not.exist(err);
                res.should.have.status(200);
                res.should.be.an('object');
                // res.should.have.property('status', 'message', 'data')
                done();
            })
    })

    it("test for no token provided",function(done){
        chai.request(server)
        .get('/label')
        .set('token',json.token1.token)
        .end(function(err,res){
            res.should.have.status(401);
            done();
        })
    })
    
    it("test for wrong token provided",function(done){
        chai.request(server)
        .get('/label')
        .set('token',json.token2.token)
        .end(function(err,res){
            res.should.have.status(401);
            done();
        })
    })
})