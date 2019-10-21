const server = require("../backend/server")
const json = require("./test.json")
// const fs = require("fs");
// const json = JSON.parse(fs.readFileSync("/home/admin1/GC/BLabz_Work/fundooApp/test/test.json"))
const chai = require("chai");
const chaiHttp = require("chai-http")

chai.use(chaiHttp);

chai.should();

describe('Testing for register API', () => {
    it('validInput test', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.validInput)
            .end( (err, res) => {
                res.should.have.status(201)
                done()
            })
    });

    it('user Already exists test', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.userExists)
            .end( (err, res) => {
                res.should.have.status(500)
                done()
            })
    });

    it('emptyInput test', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.emptyInput)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('fieldEmpty test',(done) =>{
        chai.request(server)
            .post('/user/register')
            .send(json.fieldEmpty)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('someEmptyInput test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.someEmptyInput)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('emptySpaces test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.emptySpaces)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('missingProperty test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.missingProperty)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('wrongEmail1 test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.wrongEmail1)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('wrongEmail2 test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.wrongEmail2)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });

    it('specialCharacter test',(done) => {
        chai.request(server)
            .post('/user/register')
            .send(json.specialCharacter)
            .end((err, res) => {
                res.should.have.status(406)
                done()
            })
    });
})