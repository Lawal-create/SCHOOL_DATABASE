const chai=require("chai")
const server=require("../index")
const chaiHttp=require("chai-http")
var randomEmail = require('random-email');
//Assertion Style
chai.should()

chai.use(chaiHttp)
let email=randomEmail({ domain: 'example.com' })


const studentLoginDetails={
    "studEmailAddress":"abiola@gmail.com",
    "password":"qaz123pla"
}

const teacherLoginDetails={
    "teacherEmailAddress":"osasRumeze@gmail.com",
    "password":"Lawizylawino@123"
}

const newAdmin={
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

const existingAdmin={
    "teacherFname":"Hakeem",
    "teacherMname":"Abiodun",
    "teacherLname":"Lawal",
    "teacherAddressReg":"9 poopola banjoko street Ikorodu Agric",
    "teacherPhone":"08032049887",
    "teacherGender":"male",
    "teacherAge":21,
    "teacherEmailAddress":"osasRumeze@gmail.com",
    "teacherDuration":2,
    "password":"Lawizylawino@123",
    "confirmPassword":"Lawizylawino@123"
}


const newUser={
    "studNum":"160403517",
    "studFname":"Jonathan",
    "studMname":"David",
    "studLname":"Okah",
    "studAddressReg":"9 poopola banjoko street Soluyi Gbagada",
    "studPhone":"080657489887",
    "studGender":"male",
    "studAge":19,
    "studEmailAddress":`${email}`,
    "YearOfEnrollment":2017,
    "password":"qaz123pla",
    "confirmPassword":"qaz123pla",
    "passwordChangedAt":"2021-06-13"
}

const existingUser={
    "studNum":"160403517",
    "studFname":"Jonathan",
    "studMname":"David",
    "studLname":"Okah",
    "studAddressReg":"9 poopola banjoko street Soluyi Gbagada",
    "studPhone":"080657489887",
    "studGender":"male",
    "studAge":19,
    "studEmailAddress":"abiola@gmail.com",
    "YearOfEnrollment":2017,
    "password":"qaz123pla",
    "confirmPassword":"qaz123pla",
    "passwordChangedAt":"2021-06-13"
}



describe("*********Authenticatiuon API***********",()=>{

    describe('/GET /', () => {
        it('it should GET home API url', done => {
          chai
            .request(server)
            .get('/')
            .end((err, res) => {
              res.should.have.status(200)
              done()
            })
        })
      })

      describe('/GET /500url', () => {
        it('it should GET 500 url',(done) => {
         chai
            .request(server)
            .get('/404url')
            .end((err, res) => {
              res.should.have.status(500)
              done()
            })
        })
      })


      describe("/POST /teacher signup", ()=>{
        it("it should POST signup",(done)=>{
         chai
            .request(server)
            .post("/api/teacher/signup")
            .send(newAdmin)
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.should.include.keys('message')
              done()
            })
        })
      })

      describe("/POST /teacher signup", ()=>{
        it("it should not POST signup",(done)=>{
         chai
            .request(server)
            .post("/api/teacher/signup")
            .send(existingAdmin)
            .end((err,res)=>{
              res.should.have.status(400)
              res.body.should.include.keys('message')
              done()
            })
        })
      })

      describe("/POST /teacher login", ()=>{
          it("it should GET token",(done)=>{
         chai
              .request(server)
              .post("/api/teacher/login")
              .send(teacherLoginDetails)
              .end((err,res)=>{
                  res.should.have.status(200)
                  res.body.should.include.keys('token')
                  done()
              })
          })
      })


      /**
       * *************STUDENT**************
       */

       describe("/POST /student signup",()=>{
        it("it should POST signup",done=>{
            chai
            .request(server)
            .post("/api/student/signup")
            .send(newUser)
            .end((err,res)=>{
              res.should.have.status(200)
              res.body.should.include.keys('message')
              done()
            })
        })
      })

      describe("/POST /student signup",()=>{
        it("it should not POST signup",done=>{
            chai
            .request(server)
            .post("/api/student/signup")
            .send(existingUser)
            .end((err,res)=>{
              res.should.have.status(400)
              res.body.should.include.keys('message')
              done()
            })
        })
      })

      describe("/POST /student login",()=>{
          it("it should GET token",done=>{
              chai
              .request(server)
              .post("/api/student/login")
              .send(studentLoginDetails)
              .end((err,res)=>{
                  res.should.have.status(200)
                  res.body.should.include.keys('token')
                  done()
              })
          })
      })







          




    /**
     * Test the POST routes for Teacher sign up
     */





    /**
     * Test the POST routes for teacher log in
     */
})

