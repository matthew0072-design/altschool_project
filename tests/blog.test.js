const app = require("../app")
const supertest = require("supertest")
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const dbHandler = require('./setup');
const api = supertest(app)

let token;

beforeAll(async () => {
  
    await dbHandler.connect()
    await Blog.deleteMany({})
    
    await User.create({
        "first_name": "fagoroye",
        "last_name": "matthew",
        "email": "matthew@yahoo.com",
        "password": "matthew0072"
    })


    const loginDetails = await api.post('/login').set('content-type', 'application/json')
    .send({email: "matthew@yahoo.com", password: "matthew0072"})
    
    token = loginDetails._body.user.tokens.map(token => token.token)
    
  });
  

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());








const articleToBePosted = {
    title: "the God of wonders",
    description: "miracle working God",
    tags: ["God, miracle"],
    read_count: 1,
    reading_time: "2mins",
    author: "7287227382738282",
    body: "Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    state: "published"
}


describe('GET request to get the lists of published blog', () => {
    
    it('when not logged in should be able to get a list of published blogs', async () => {
      const response = await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    })

    
    it("Should only create blog if user is logged in", async () => {
      const response = await api
        .post('/article')
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(articleToBePosted)
       .expect(201)
       
      //  expect(response.body.status).toStrictEqual("success");
      // expect(response.body.data.blog).toBeTruthy();
      // expect(response.body.data.blog.title).toBe("test2");
      // expect(response.body.data.blog.author).toBeTruthy();
      // expect(response.body.data.blog.author).toBe(author.id);
    });




})



