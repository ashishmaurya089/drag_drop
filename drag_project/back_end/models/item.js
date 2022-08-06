const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({

    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    status: {
        type: String,
        enum: ['OPEN', 'IN-PROGRESS', 'COMPLETED'],
        required : true 
    },
    date: {
        type: Date,
        required : true
    },
    

})

module.exports = mongoose.model("Item",itemSchema)