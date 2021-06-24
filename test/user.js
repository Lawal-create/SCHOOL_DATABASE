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

const updateStudentDetail={
    studPhone:"08076597632",
    studAge:21
}

describe("*********USER*********",()=>{
    var token;

        describe("/GET /STUDENT",()=>{
            it("it should send back an error without token",(next)=>{
                chai
                .request(server)
                .get("/api/student")
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

        it('it should GET all the users', (done) => {
            chai
              .request(server)
              .get('/api/student')
              .set({'Authorization':`Bearer ${token}`})
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')

                done()
              })
          })

          it("it should GET a user based on query",(done)=>{
              chai
              .request(server)
              .get("/api/student?role=user&studEmailAddress=abiola@gmail.com")
              .set({'Authorization':`Bearer ${token}`})
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                createdID.push(res.body.data.students[0]._id)
                done()
          })

        })

        describe('/GET /api/student/:id ', () => {
            it('it should GET a student by given id', done => {
              const id = createdID.slice(-1).pop()
              chai
                .request(server)
                .get(`/api/student/${id}`)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
            })

            it('it should not get any user if a wrong ID is given', done => {
              const id = createdID.slice(-1).pop()+"1"
              chai
                .request(server)
                .get(`/api/student/${id}`)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(404)
                  res.body.should.have.property('message')
                  done()
                })
            })
          })

        describe('/PATCH /api/student/:id ', () => {
        it('it should UPDATE a user given by the id', done => {
            const id = createdID.slice(-1).pop()
            chai
                .request(server)
                .get(`/api/student/${id}`)
                .send(updateStudentDetail)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
        })

        it('it should not UPDATE a user given by the id', done => {
            const id = createdID.slice(-1).pop()+"1"
            chai
                .request(server)
                .get(`/api/student/${id}`)
                .send(updateStudentDetail)
                .set({'Authorization':`Bearer ${token}`})
                .end((error, res) => {
                  res.should.have.status(404)
                  res.body.should.have.property('message')
                  done()
                })
        })
    })

    describe("/DELETE /api/student/:id",()=>{
        const newUser={
            "studNum":"160403517",
            "studFname":"Abiola",
            "studMname":"Johnson",
            "studLname":"Tomiwa",
            "studAddressReg":"9 poopola banjoko street Soluyi Gbagada",
            "studPhone":"080657489887",
            "studGender":"male",
            "studAge":21,
            "studEmailAddress":`${email}`,
            "YearOfEnrollment":2017,
            "password":"qaz123pla",
            "confirmPassword":"qaz123pla",
            "passwordChangedAt":"2021-06-13"
        }
        it("it should DELETE a user given by an id",(done)=>{
                chai
                .request(server)
                .post("/api/student/signup")
                .send(newUser)
                .end((err,res)=>{
                  res.should.have.status(200)
                  res.body.should.include.keys('message')
                  chai
                  .request(server)
                  .get('/api/student')
                  .set({'Authorization':`Bearer ${token}`})
                  .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    createdID.push(res.body.data.students.slice(-1)[0]._id)
                    const id = createdID[createdID.length-1]
                    chai
                    .request(server)
                    .delete(`/api/student/${id}`)
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