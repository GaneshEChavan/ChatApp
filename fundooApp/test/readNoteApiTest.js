const server = require("../backend/server");
const chai = require("chai");
const chaiHttp = require("chai-http")
const json = require("./test.json")

chai.use(chaiHttp)
chai.should()

describe("API test of read all notes",function(){
    it("test for correct information",function(done){
        chai.request(server)
        .get('/note')
        .set('token',json.token.token)
        .end(function(err,res){
            res.should.have.status(200)
            done()
        })
    })

    it("test for no token passed",function(done){
       chai.request(server)
       .get('/note')
       .end(function(err,res){
           res.should.have.status(401)
           done()
       })
    })

    it("test for wrong token or empty",function(done){
        chai.request(server)
        .get('/note')
        .set('token',json.token1.token)
        .end(function(err,res){
            res.should.have.status(401)
            done()
        })
    })
})