const server = require("../backend/server")
const json = require("./test.json")
const chai = require("chai");
const chaiHttp = require("chai-http")

chai.use(chaiHttp);
chai.should();

describe('Testing for login API',function(){
    it('fieldEmpty test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.fieldEmpty)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('emptyEmail test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.emptyEmail)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('emptyPassword test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.emptyPassword)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('invalidEmail1 test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.invalidEmail1)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('invalidEmail2 test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.invalidEmail2)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('invalidEmail3 test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.invalidEmail3)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('invalidEmail1 test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.invalidEmail1)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });

    it('invalidEmail1 test',function(done){
        chai.request(server)
        .post('/user/login')
        .send(json.invalidEmail1)
        .end(function(err,res){
            res.should.have.status(404)
            done()
        })
    });
})