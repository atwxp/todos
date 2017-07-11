import sinon from 'sinon'
import { expect } from 'chai'

import mongoose from 'mongoose'
require('sinon-mongoose')

import todoInstance from '../../../src/server/models/todo'

describe('Todo Controller', () => {
    describe('Get Todo', () => {
        it('should return one todo')

        it('should return all todos', () => {
            const todoMock = sinon.mock(todoInstance.todoModel)

            todoMock.expects('find').yields(null, {
                status: 0,
                todo: []
            })

            todoInstance.fetchById()
                .then(result => {
                    todoMock.verrify()
                    todoMock.restore()
                    expect(result.status).to.be.equal(0)
                    done()
                })
                .catch(e => {})
        })
    })

    describe('Post Todo', () => {

    })
})
