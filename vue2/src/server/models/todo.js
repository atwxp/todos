import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    text: String,
    done: Boolean
})

const todoModel = mongoose.model('Todo', todoSchema)

class Todo {
    constructor() {
        this.todoModel = todoModel
    }

    async fetchById(id) {
        return await todoModel.find({}, '_id text done').exec()
    }

    async create(todo) {
        return await todoModel.create(todo)
    }

    async updateById(userid, id, data) {
        await todoModel.findOneAndUpdate({ _id: id }, { $set: data }).exec()
    }

    async removeById(userid, id) {
        await todoModel.remove({ _id: id }).exec()
    }
}

export default new Todo()
