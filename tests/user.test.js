
const app = require("../app")
const supertest = require("supertest")
const User = require('../models/userSchema')
const dbHandler = require('./setup');
const api = supertest(app)


  //Connect to a new in-memory database before running any tests.
 
beforeAll(async () => {
  
  await dbHandler.connect()
  
});



beforeEach( async() => {
  await User.create(signupDetails)
})

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());


describe('POST request to /api/login', () => {
  test('is successful if user is registered in the database', async () => {
    const response = await api
      .post('/login')
      .send({
        email: 'matthew@yahoo.com',
        password: 'matthew0072',
      })
      .expect(200)

    expect(response.body).toHaveProperty('token')
    expect(response.body.first_name).toBe(response.first_name)
  })


})


describe('post request to api/signup', () => {
  test('with correct details successfully creates a user', async () => {
    const newUser = {
      first_name: 'user_firstname',
      last_name: 'user_lastname',
      email: 'useremail@mail.com',
      password: 'password',
      
    }

    const response = await api
      .post('/signup')
      .send(newUser)
      .expect(201)

      expect(response.body).toHaveProperty('token')
      
      
  })

})

const signupDetails = {
 
  "first_name": "fagoroye"  ,
  "last_name": "ayobami",
  "email": "matthew@yahoo.com",
  "password": "matthew0072"
}
