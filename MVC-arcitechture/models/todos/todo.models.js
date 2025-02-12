const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'User',
    },
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refer: 'SubTodo'
        }
    ]
},{timestamps: true});


const Todo = mongoose.model('Todo',todoSchema);

module.exports= Todo;