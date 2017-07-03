import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    account: String,
    password: String
})

const userModel = mongoose.model('User', userSchema)

class User {
    constructor() {
        this.userModel = userModel
    }

    async getUserByAccount(account) {
        return await userModel.findOne({ account }).exec()
    }

    async getUserById(id) {
        return await userModel.findOne({ _id: id }).exec()
    }
}

export default new User()
