let server = require("../backend/server");
let json = require("./test.json");
let chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("Testing for create note API",function(){
    // it("test for token in header",function(done){
    //     chai.request(server)
    //     .post('/createNote')
    //     .set('token',json.token.token)
    //     .end(function(err,res){
    //     res.should.have.status(201)
    //     done()
    //     })
    // })

    it("test for no token in header",function(done){
        chai.request(server)
        .post('/createNote')
        .set('token',json.token1.token)
        .end(function(err,res){
        res.should.have.status(401)
        done()
        })
    })

    it("test for correct info",function(done){
        chai.request(server)
        .post('/createNote')
        .set('token',json.token.token)
        .send(json.noteInfo)
        .end(function(err,res){
        res.should.have.status(201)
        done()
        })
    })

    it("test for empty noteInfo",function(done){
        chai.request(server)
        .post('/createNote')
        .set('token',json.token.token)
        .send(json.fieldEmpty)
        .end(function(err,res){
        res.should.have.status(201)
        done()
        })
    })
})

