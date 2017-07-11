import request from 'supertest'
import { expect } from 'chai'

import app from '../../../src/server/index'

const agent = request(app.listen())

describe('Todo CRUD integration testing', () => {
    describe('Get All Todo', () => {
        it('should get status 0 and array todo', done => {
            agent
                .get('/api/todos')
                .expect(200)
                .end((err, results) => {
                    expect(results.body.status).to.be.equal(0)
                    done()
                })
        })
    })

    describe('Post a todo', () => {

    })

    describe('Delete a todo', () => {
        
    })

    describe('Update a todo', () => {
        
    })
})
