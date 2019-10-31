const server = require("../backend/server");
const chai = require("chai");
const chaiHttp = require("chai-http")
const json = require("./test.json")

chai.use(chaiHttp)
chai.should()

describe("Test for delete note API",function(){
    it("test for correct info",function(done){
        chai.request(server)
        .delete('/note')
        .set('token',json.token.token)
        .send(json.deleteNote)
        .end(function(err,res){
            res.should.have.status(200)
            done()
        })
    })

    it("test for no token provided",function(done){
        chai.request(server)
        .delete('/note')
        .set('token',json.token1.token)
        .send(json.deleteNote)
        .end(function(err,res){
            res.should.have.status(401)
            done()
        })
    })

    it("test for empty header",function(done){
        chai.request(server)
        .delete('/note')
        .send(json.deleteNote)
        .end(function(err,res){
            res.should.have.status(401)
            done()
        })
    })

    it("test for no note id provided or empty request body",function(done){
        chai.request(server)
        .delete('/note')
        .set('token',json.token.token)
        .end(function(err,res){
            res.should.have.status(500)
            done()
        })
    })
})