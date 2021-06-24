const chai=require("chai")
const server=require("../index")
const chaiHttp=require("chai-http")
var randomEmail = require('random-email');

//Assertion Style
chai.should()

chai.use(chaiHttp)
const createdID=[]

let email=randomEmail({ domain: 'gmail.com' })

const teacherLoginDetails={
    "teacherEmailAddress":"osasRumeze@gmail.com",
    "password":"Lawizylawino@123"
}

const updateTeacherDetails={
    TeacherPhone:"08076597632",
    TeacherAge:35
}

describe("*********admin*********",()=>{
    var token;

        describe("/GET /teacher",()=>{
            it("it should send back an error without token",(next)=>{
                chai
                .request(server)
                .get("/api/teacher")
                .end((err,res)=>{
                    res.should.have.status(401)
                    next()
                })
            })

            beforeEach("it should login an admin",(done)=>{
                chai
                .request(server)
                .post("/api/teacher/login")
                  .send(teacherLoginDetails)
                  .end((err,res)=>{
                      res.should.have.status(200)
                      res.body.should.be.an('object')
                      res.body.should.include.keys('token')
                      token=res.body.token
                      done()
                })
            })

        it('it should GET all the admin', (done) => {
            chai
              .request(server)
              .get('/api/teacher')
              .set({'Authorization':`Bearer ${token}`})
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
              })
          })

          it("it should GET a admin based on query",(done)=>{
              chai
              .request(server)
              .get(`/api/teacher?role=admin&teacherEmailAddress=${teacherLoginDetails.teacherEmailAddress}`)
              .set({'Authorization':`Bearer ${token}`})
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                createdID.push(res.body.Teachers[0]._id)
                done()
          })

        })

        describe('/GET /api/teacher/:id ', () => {
            it('it should GET a teacher by given id', done => {
              const id = createdID.slice(-1).pop()
              chai
                .request(server)
                .get(`/api/teacher/${id}`)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
            })

            it('it should not get any admin if a wrong ID is given', done => {
              const id = createdID.slice(-1).pop()+"1"
              chai
                .request(server)
                .get(`/api/teacher/${id}`)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(404)
                  res.body.should.have.property('message')
                  done()
                })
            })
          })

        describe('/PATCH /api/teacher/:id ', () => {
        it('it should UPDATE a admin given by the id', done => {
            const id = createdID.slice(-1).pop()
            chai
                .request(server)
                .get(`/api/teacher/${id}`)
                .send(updateTeacherDetails)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
        })

        it('it should not UPDATE a admin given by the id', done => {
            const id = createdID.slice(-1).pop()+"1"
            chai
                .request(server)
                .get(`/api/teacher/${id}`)
                .send(updateTeacherDetails)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(404)
                  res.body.should.have.property('message')
                  done()
                })
        })
    })

    describe("/DELETE /api/teacher/:id",()=>{
        const newadmin={
            "teacherFname":`Hameed`,
            "teacherMname":"Abiodun",
            "teacherLname":"Lawal",
            "teacherAddressReg":"9 poopola banjoko street Ikorodu Agric",
            "teacherPhone":"08032049887",
            "teacherGender":"male",
            "teacherAge":21,
            "teacherEmailAddress":`${email}`,
            "teacherDuration":2,
            "password":"Lawizylawino@123",
            "confirmPassword":"Lawizylawino@123"
        }
        it("it should DELETE a admin given by an id",(done)=>{
                chai
                .request(server)
                .post("/api/teacher/signup")
                .send(newadmin)
                .end((err,res)=>{
                  res.should.have.status(200)
                  res.body.should.include.keys('message')
                  chai
                  .request(server)
                  .get('/api/teacher')
                  .set({'Authorization':`Bearer ${token}`})
                  .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    createdID.push(res.body.Teachers.slice(-1)[0]._id)
                    const id = createdID[createdID.length-1]
                    chai
                    .request(server)
                    .delete(`/api/teacher/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((error, result) => {
                    result.should.have.status(204)
                    done()
                    })
                  })
                })
        

        })
    })
    })
})