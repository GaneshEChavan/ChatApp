const server = require("../backend/server")
const json = require("./test.json")
const chai = require("chai");
const chaiHttp = require("chai-http")

chai.use(chaiHttp);
chai.should()

describe('testing for image upload API', function () {
    it('token not provided', function (done) {
        chai.request(server)
            .post('/image-upload')
            .set('token',json.token.token)
            .end(function (err, res) {
                res.should.have.status(401)
                done()
            })
    })

    it('image form-data provided', function (done) {
        chai.request(server)
            .post('/image-upload')
            .set('token',json.token1.token)
            .attach('image','/home/admin1/Desktop/mrBean.jpg','mrBean.jpg')
            .type('form')
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })
    })

    it('image form-data not provided', function (done) {
        chai.request(server)
            .post('/image-upload')
            .attach('image','/home/admin1/Downloads/sample.txt','sample.txt')
            .type('form')
            .end(function (err, res) {
                res.should.have.status(401)
                done()
            })
    })
})