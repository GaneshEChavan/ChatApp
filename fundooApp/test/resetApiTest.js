const server = require("../backend/server")
const json = require("./test.json")
const chai = require("chai");
const chaiHttp = require("chai-http")

chai.use(chaiHttp);

chai.should();

describe('Testing for reset API',function(){
    it('passwordOnly test',function(done){
        chai.request(server)
        .post('/reset')
        .set("token",json.token.token)
        .send(json.passwordOnly1)
        .end(function(err,res){
            res.should.have.status(406)
            done()
        })
    });

    it('passwordOnly  test',function(done){
        chai.request(server)
        .post('/reset')
        .set("token",json.token.token)
        .send(json.passwordOnly2)
        .end(function(err,res){
            res.should.have.status(406)
            done()
        })
    });

    it('passwordOnly test',function(done){
        chai.request(server)
        .post('/reset')
        .set("token",json.token.token)
        .send(json.passwordOnly3)
        .end(function(err,res){
            res.should.have.status(406)
            done()
        })
    });

    it('passwordOnly test',function(done){
        chai.request(server)
        .post('/reset')
        .set("token",json.token.token)
        .send(json.passwordOnly4)
        .end(function(err,res){
            res.should.have.status(406)
            done()
        })
    });
})