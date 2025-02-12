const mongoose = require('mongoose');

const subTodoSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        refer: "User",
    }
})



const SubTodo = mongoose.model('SubTodo',subTodoSchema);

module.exports = SubTodo;