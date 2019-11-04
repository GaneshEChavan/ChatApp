let server = require("../backend/server");
let json = require("./test.json");
let chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("Testing for delete label API",function(){

    it("test for no token in header",function(done){
        chai.request(server)
        .delete('/label')
        .set('token',json.token1.token)
        .end(function(err,res){
        res.should.have.status(401)
        done()
        })
    })

    it("test for correct info",function(done){
        chai.request(server)
        .delete('/label')
        .set('token',json.token.token)
        .send(json.labelid)
        .end(function(err,res){
        res.should.have.status(200)
        done()
        })
    })

    it("test for empty label id",function(done){
        chai.request(server)
        .delete('/label')
        .set('token',json.token.token)
        .send(json.fieldEmpty)
        .end(function(err,res){
        res.should.have.status(500)
        done()
        })
    })

    it("test for wrong label id",function(done){
        chai.request(server)
        .delete('/label')
        .set('token',json.token.token)
        .send(json.wronglabelid)
        .end(function(err,res){
        res.should.have.status(500)
        done()
        })
    })
})