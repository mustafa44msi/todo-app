const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, 'Görev başlığı zorunlu']
        },
    completed:{
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model('task', taskSchema);