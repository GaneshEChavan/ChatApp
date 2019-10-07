const server = require("../backend/server")
const json = require("./test.json")
const chai = require("chai");
const chaiHttp = require("chai-http")
chai.use(chaiHttp);

chai.should();

describe('Testing for forget Password API',function(){
    it('wrongemail1 test',function(done){
        chai.request(server)
        .post('/forgot')
        .send(json.wrongemail1)
        .end(function(err,res){
            res.should.have.status(400)
            done()
        })
    });

    it('wrongemail2 test',function(done){
        chai.request(server)
        .post('/forgot')
        .send(json.wrongemail2)
        .end(function(err,res){
            res.should.have.status(400)
            done()
        })
    });

    it('fieldEmpty test',function(done){
        chai.request(server)
        .post('/forgot')
        .send(json.fieldEmpty)
        .end(function(err,res){
            res.should.have.status(400)
            done()
        })
    });

    it('empty test',function(done){
        chai.request(server)
        .post('/forgot')
        .send(json.empty)
        .end(function(err,res){
            res.should.have.status(400)
            done()
        })
    });

    it('valid forgot password test',function(done){
        chai.request(server)
        .post('/forgot')
        .send(json.validForForgot)
        .end(function(err,res){
            res.should.have.status(202)
            done()
        })
    });
})