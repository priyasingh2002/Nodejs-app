// describe("sample tests", ()=>{
//     test("First test case", ()=>{
//         expect(1+1).toBe(2);
//     })

//     test("Second test case", ()=>{
//         expect(1+2).toBe(3)
//     })


//     test("third test case", ()=>{
//         expect(2+2).toBe(4)
//     })

//     test("fourth test case", ()=>{
//         expect(9+2).toBe(11)
//     })

//     test("fifth test case", ()=>{
//         expect(10+20).toBe(30)
//     })
// })



// import  request from 'supertest'
// import app from '../index.js'

const request = require('supertest');
const app = require('../index.js')

describe('CRUD API tests', ()=>{
    let itemId;

    //test for creating an item
    it('should create an item', async()=>{
        const response=await request(app)
        .post('/items')
        .send({id: '1', name: 'Test Item' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({id:'1', name: 'Test Item'})
        itemId=response.body.id; //save id for other tests
    })


    //test for reading an item
    it('should read an item', async()=>{
        const response=await request(app)
        .get(`/items/${itemId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({id:'1', name: 'Test Item'})
   
    })

    //test for updating an item
    it('should update an item', async()=>{
        const response=await request(app)
        .put(`/items/${itemId}`)
        .send({name: 'Updated Item'})
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Item')
   
    })

    //test for deleting an item
    it('should delete an item', async()=>{
        const response=await request(app)
        .delete(`/items/${itemId}`)
       
        expect(response.statusCode).toBe(204);
    })

    //test for reading a non-existing item
    it('should return 404 for non-existing item', async()=>{
        const response=await request(app).get(`/items/${itemId}`);
        expect(response.statusCode).toBe(404);
    })
})